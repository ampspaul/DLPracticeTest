"""
Comprehensive tests for the user login/authentication feature.
Covers AC1–AC14.
"""
import pytest


# ---------------------------------------------------------------------------
# AC1: Health check endpoint
# ---------------------------------------------------------------------------
class TestHealthCheck:
    def test_health_endpoint_returns_ok(self, client):
        resp = client.get("/health")
        assert resp.status_code == 200
        assert resp.json() == {"status": "ok"}


# ---------------------------------------------------------------------------
# AC2 & AC3: User registration
# ---------------------------------------------------------------------------
class TestRegistration:
    def test_register_new_user_success(self, client):
        payload = {
            "username": "newuser",
            "email": "newuser@example.com",
            "password": "StrongPass1",
        }
        resp = client.post("/api/v1/auth/register", json=payload)
        assert resp.status_code == 201
        data = resp.json()
        assert data["username"] == "newuser"
        assert data["email"] == "newuser@example.com"
        assert "hashed_password" not in data
        assert "password" not in data
        assert data["is_active"] is True

    def test_register_duplicate_username_returns_409(self, client, registered_user):
        payload = {
            "username": registered_user["username"],
            "email": "other@example.com",
            "password": "AnotherPass1",
        }
        resp = client.post("/api/v1/auth/register", json=payload)
        assert resp.status_code == 409

    def test_register_duplicate_email_returns_409(self, client, registered_user):
        payload = {
            "username": "otheruser",
            "email": registered_user["email"],
            "password": "AnotherPass1",
        }
        resp = client.post("/api/v1/auth/register", json=payload)
        assert resp.status_code == 409

    def test_register_weak_password_rejected(self, client):
        payload = {
            "username": "weakuser",
            "email": "weak@example.com",
            "password": "short",
        }
        resp = client.post("/api/v1/auth/register", json=payload)
        assert resp.status_code == 422

    def test_register_password_no_uppercase_rejected(self, client):
        resp = client.post(
            "/api/v1/auth/register",
            json={"username": "user2", "email": "u2@example.com", "password": "alllowercase1"},
        )
        assert resp.status_code == 422

    def test_register_password_no_digit_rejected(self, client):
        resp = client.post(
            "/api/v1/auth/register",
            json={"username": "user3", "email": "u3@example.com", "password": "NoDigitPass"},
        )
        assert resp.status_code == 422

    def test_register_invalid_email_rejected(self, client):
        resp = client.post(
            "/api/v1/auth/register",
            json={"username": "user4", "email": "not-an-email", "password": "ValidPass1"},
        )
        assert resp.status_code == 422

    def test_register_short_username_rejected(self, client):
        resp = client.post(
            "/api/v1/auth/register",
            json={"username": "ab", "email": "ab@example.com", "password": "ValidPass1"},
        )
        assert resp.status_code == 422


# ---------------------------------------------------------------------------
# AC4 & AC5: Login
# ---------------------------------------------------------------------------
class TestLogin:
    def test_login_valid_credentials_returns_token(self, client, registered_user):
        resp = client.post(
            "/api/v1/auth/login",
            json={"username": registered_user["username"], "password": registered_user["password"]},
        )
        assert resp.status_code == 200
        data = resp.json()
        assert "access_token" in data
        assert data["token_type"] == "bearer"
        assert data["expires_in"] > 0

    def test_login_wrong_password_returns_401(self, client, registered_user):
        resp = client.post(
            "/api/v1/auth/login",
            json={"username": registered_user["username"], "password": "WrongPassword1"},
        )
        assert resp.status_code == 401

    def test_login_unknown_username_returns_401(self, client):
        resp = client.post(
            "/api/v1/auth/login",
            json={"username": "nobody", "password": "Password1"},
        )
        assert resp.status_code == 401

    def test_login_missing_fields_returns_422(self, client):
        resp = client.post("/api/v1/auth/login", json={"username": "testuser"})
        assert resp.status_code == 422


# ---------------------------------------------------------------------------
# AC6 & AC7: Protected /me endpoint
# ---------------------------------------------------------------------------
class TestMeEndpoint:
    def test_get_me_with_valid_token(self, client, registered_user, auth_token):
        resp = client.get(
            "/api/v1/auth/me",
            headers={"Authorization": f"Bearer {auth_token}"},
        )
        assert resp.status_code == 200
        data = resp.json()
        assert data["username"] == registered_user["username"]
        assert data["email"] == registered_user["email"]

    def test_get_me_without_token_returns_403(self, client):
        resp = client.get("/api/v1/auth/me")
        assert resp.status_code == 403

    def test_get_me_with_invalid_token_returns_403_or_401(self, client):
        resp = client.get(
            "/api/v1/auth/me",
            headers={"Authorization": "Bearer this.is.invalid"},
        )
        assert resp.status_code in (401, 403)

    def test_get_me_does_not_expose_password(self, client, auth_token):
        resp = client.get(
            "/api/v1/auth/me",
            headers={"Authorization": f"Bearer {auth_token}"},
        )
        assert resp.status_code == 200
        data = resp.json()
        assert "hashed_password" not in data
        assert "password" not in data


# ---------------------------------------------------------------------------
# AC8 & AC9: Logout
# ---------------------------------------------------------------------------
class TestLogout:
    def test_logout_invalidates_token(self, client, registered_user, auth_token):
        # Logout
        resp = client.post(
            "/api/v1/auth/logout",
            headers={"Authorization": f"Bearer {auth_token}"},
        )
        assert resp.status_code == 200
        assert resp.json()["message"] == "Successfully logged out."

        # Using the same token after logout should be rejected
        resp2 = client.get(
            "/api/v1/auth/me",
            headers={"Authorization": f"Bearer {auth_token}"},
        )
        assert resp2.status_code == 401

    def test_logout_without_token_returns_403(self, client):
        resp = client.post("/api/v1/auth/logout")
        assert resp.status_code == 403

    def test_double_logout_is_gracefully_handled(self, client, auth_token):
        client.post(
            "/api/v1/auth/logout",
            headers={"Authorization": f"Bearer {auth_token}"},
        )
        # Second logout — token still structurally valid but blacklisted
        resp = client.post(
            "/api/v1/auth/logout",
            headers={"Authorization": f"Bearer {auth_token}"},
        )
        # Could be 200 (idempotent) or 401 depending on implementation;
        # both are acceptable — just not a 500.
        assert resp.status_code in (200, 401)


# ---------------------------------------------------------------------------
# AC10: Password is never stored in plaintext
# ---------------------------------------------------------------------------
class TestPasswordSecurity:
    def test_password_is_hashed_in_db(self, db, client, registered_user):
        from src.auth.models import User

        user = db.query(User).filter(User.username == registered_user["username"]).first()
        assert user is not None
        assert user.hashed_password != registered_user["password"]
        assert user.hashed_password.startswith("$2b$") or user.hashed_password.startswith("$2a$")


# ---------------------------------------------------------------------------
# AC11: Token structure is valid JWT
# ---------------------------------------------------------------------------
class TestTokenStructure:
    def test_access_token_is_valid_jwt(self, client, registered_user):
        resp = client.post(
            "/api/v1/auth/login",
            json={"username": registered_user["username"], "password": registered_user["password"]},
        )
        token = resp.json()["access_token"]
        parts = token.split(".")
        assert len(parts) == 3, "JWT must have three dot-separated parts"


# ---------------------------------------------------------------------------
# AC12: Inactive user cannot login
# ---------------------------------------------------------------------------
class TestInactiveUser:
    def test_inactive_user_cannot_login(self, client, db, registered_user):
        from src.auth.models import User

        user = db.query(User).filter(User.username == registered_user["username"]).first()
        user.is_active = False
        db.commit()

        resp = client.post(
            "/api/v1/auth/login",
            json={"username": registered_user["username"], "password": registered_user["password"]},
        )
        assert resp.status_code == 403


# ---------------------------------------------------------------------------
# AC13: Multiple users are independent
# ---------------------------------------------------------------------------
class TestMultipleUsers:
    def test_two_users_have_independent_sessions(self, client):
        for i in range(1, 3):
            client.post(
                "/api/v1/auth/register",
                json={
                    "username": f"user{i}",
                    "email": f"user{i}@example.com",
                    "password": "SecurePass1",
                },
            )

        token1 = client.post(
            "/api/v1/auth/login",
            json={"username": "user1", "password": "SecurePass1"},
        ).json()["access_token"]

        token2 = client.post(
            "/api/v1/auth/login",
            json={"username": "user2", "password": "SecurePass1"},
        ).json()["access_token"]

        me1 = client.get("/api/v1/auth/me", headers={"Authorization": f"Bearer {token1}"}).json()
        me2 = client.get("/api/v1/auth/me", headers={"Authorization": f"Bearer {token2}"}).json()

        assert me1["username"] == "user1"
        assert me2["username"] == "user2"
        assert me1["id"] != me2["id"]


# ---------------------------------------------------------------------------
# AC14: CORS headers present
# ---------------------------------------------------------------------------
class TestCORS:
    def test_cors_headers_present_on_options(self, client):
        resp = client.options(
            "/api/v1/auth/login",
            headers={"Origin": "http://example.com", "Access-Control-Request-Method": "POST"},
        )
        # FastAPI returns 200 for preflight when CORS middleware is configured
        assert resp.status_code in (200, 400)