from datetime import datetime, timezone
from typing import Optional

from jose import JWTError
from sqlalchemy.orm import Session

from src.auth.models import TokenBlacklist, User
from src.auth.schemas import UserRegister
from src.auth.security import create_access_token, decode_access_token, hash_password, verify_password
from src.config import settings


class AuthError(Exception):
    """Base authentication/authorisation error."""

    def __init__(self, message: str, status_code: int = 401):
        self.message = message
        self.status_code = status_code
        super().__init__(message)


def get_user_by_username(db: Session, username: str) -> Optional[User]:
    return db.query(User).filter(User.username == username).first()


def get_user_by_email(db: Session, email: str) -> Optional[User]:
    return db.query(User).filter(User.email == email).first()


def get_user_by_id(db: Session, user_id: int) -> Optional[User]:
    return db.query(User).filter(User.id == user_id).first()


def register_user(db: Session, data: UserRegister) -> User:
    if get_user_by_username(db, data.username):
        raise AuthError("Username already registered.", status_code=409)
    if get_user_by_email(db, data.email):
        raise AuthError("Email already registered.", status_code=409)

    user = User(
        username=data.username,
        email=data.email,
        hashed_password=hash_password(data.password),
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return user


def authenticate_user(db: Session, username: str, password: str) -> User:
    user = get_user_by_username(db, username)
    if not user:
        raise AuthError("Invalid username or password.", status_code=401)
    if not user.is_active:
        raise AuthError("Account is inactive.", status_code=403)
    if not verify_password(password, user.hashed_password):
        raise AuthError("Invalid username or password.", status_code=401)
    return user


def login_user(db: Session, username: str, password: str) -> dict:
    user = authenticate_user(db, username, password)
    token, jti = create_access_token(subject=str(user.id))
    return {
        "access_token": token,
        "token_type": "bearer",
        "expires_in": settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60,
        "user": user,
    }


def logout_user(db: Session, token: str) -> None:
    """Blacklist the given token's JTI so it cannot be reused."""
    try:
        payload = decode_access_token(token)
    except JWTError as exc:
        raise AuthError(f"Invalid token: {exc}", status_code=401) from exc

    jti = payload.get("jti")
    exp = payload.get("exp")
    if not jti or not exp:
        raise AuthError("Malformed token.", status_code=401)

    expires_at = datetime.fromtimestamp(exp, tz=timezone.utc)
    blacklisted = TokenBlacklist(jti=jti, expires_at=expires_at)
    db.add(blacklisted)
    db.commit()


def is_token_blacklisted(db: Session, jti: str) -> bool:
    return db.query(TokenBlacklist).filter(TokenBlacklist.jti == jti).first() is not None


def get_current_user_from_token(db: Session, token: str) -> User:
    try:
        payload = decode_access_token(token)
    except JWTError as exc:
        raise AuthError(f"Could not validate credentials: {exc}", status_code=401) from exc

    jti = payload.get("jti")
    if jti and is_token_blacklisted(db, jti):
        raise AuthError("Token has been revoked.", status_code=401)

    user_id: Optional[str] = payload.get("sub")
    if user_id is None:
        raise AuthError("Could not validate credentials.", status_code=401)

    user = get_user_by_id(db, int(user_id))
    if user is None:
        raise AuthError("User not found.", status_code=401)
    if not user.is_active:
        raise AuthError("Account is inactive.", status_code=403)
    return user