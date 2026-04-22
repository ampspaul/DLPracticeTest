"""
app.py — Flask application factory.
"""

from __future__ import annotations

import os

from flask import Flask

from .auth_routes import auth_bp


def create_app(config: dict | None = None) -> Flask:
    app = Flask(__name__)

    # Defaults
    app.config["SECRET_KEY"] = os.environ.get("SECRET_KEY", "dev-secret-key-change-in-prod")
    app.config["SESSION_COOKIE_HTTPONLY"] = True
    app.config["SESSION_COOKIE_SAMESITE"] = "Lax"
    app.config["SESSION_COOKIE_SECURE"] = os.environ.get("FLASK_ENV") == "production"
    app.config["POST_LOGIN_REDIRECT"] = "/dashboard"
    app.config["DISABLE_CSRF_FOR_TESTS"] = False

    if config:
        app.config.update(config)

    app.register_blueprint(auth_bp)

    return app