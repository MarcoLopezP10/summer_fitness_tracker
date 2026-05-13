import json
import base64
from urllib.parse import quote, unquote

import streamlit as st

from src.supabase_client import clear_supabase_session, get_supabase_client, set_supabase_session
from src.ui import render_html

ACCESS_COOKIE = "ft_sb_access"
REFRESH_COOKIE = "ft_sb_refresh"


def auth_enabled() -> bool:
    return bool(
        st.secrets.get("SUPABASE_URL", st.secrets.get("NEXT_PUBLIC_SUPABASE_URL"))
        and st.secrets.get("SUPABASE_KEY", st.secrets.get("NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY"))
    )


def is_authenticated() -> bool:
    return bool(st.session_state.get("authenticated", False))


def _decode_jwt_payload(token: str) -> dict:
    try:
        parts = token.split(".")
        if len(parts) < 2:
            return {}
        payload = parts[1]
        padding = "=" * (-len(payload) % 4)
        decoded = base64.urlsafe_b64decode(payload + padding)
        return json.loads(decoded.decode("utf-8"))
    except Exception:
        return {}


def _restore_session() -> bool:
    access_token = st.session_state.get("supabase_access_token")
    refresh_token = st.session_state.get("supabase_refresh_token")
    if not access_token or not refresh_token:
        access_token = st.context.cookies.get(ACCESS_COOKIE)
        refresh_token = st.context.cookies.get(REFRESH_COOKIE)
        if access_token and refresh_token:
            access_token = unquote(access_token)
            refresh_token = unquote(refresh_token)

    if not access_token or not refresh_token:
        return False

    try:
        client = set_supabase_session(access_token, refresh_token)
        session_response = client.auth.get_session()
        session = getattr(session_response, "session", None)
        if session:
            access_token = getattr(session, "access_token", access_token)
            refresh_token = getattr(session, "refresh_token", refresh_token)
            st.session_state.supabase_access_token = access_token
            st.session_state.supabase_refresh_token = refresh_token
            _persist_auth_cookies(access_token, refresh_token)

        payload = _decode_jwt_payload(access_token)
        user_email = payload.get("email")
        if not user_email:
            user_response = get_supabase_client().auth.get_user()
            user = getattr(user_response, "user", None)
            user_email = getattr(user, "email", None) if user else None
        if not user_email:
            clear_supabase_session()
            st.session_state.authenticated = False
            st.session_state.auth_user_email = None
            return False
        st.session_state.authenticated = True
        st.session_state.auth_user_email = user_email
        return True
    except Exception:
        clear_supabase_session()
        st.session_state.authenticated = False
        st.session_state.auth_user_email = None
        return False


def _persist_auth_cookies(access_token: str, refresh_token: str) -> None:
    render_html(
        f"""
        <script>
        document.cookie = {json.dumps(f"{ACCESS_COOKIE}={quote(access_token)}; path=/; max-age=2592000; SameSite=Lax")};
        document.cookie = {json.dumps(f"{REFRESH_COOKIE}={quote(refresh_token)}; path=/; max-age=2592000; SameSite=Lax")};
        </script>
        """
    )


def _clear_auth_cookies() -> None:
    render_html(
        f"""
        <script>
        document.cookie = {json.dumps(f"{ACCESS_COOKIE}=; path=/; max-age=0; SameSite=Lax")};
        document.cookie = {json.dumps(f"{REFRESH_COOKIE}=; path=/; max-age=0; SameSite=Lax")};
        </script>
        """
    )


def logout() -> None:
    try:
        get_supabase_client().auth.sign_out()
    except Exception:
        pass
    _clear_auth_cookies()
    clear_supabase_session()
    st.session_state.authenticated = False
    st.session_state.auth_user_email = None


def require_login() -> bool:
    if not auth_enabled():
        return True

    if is_authenticated():
        return True

    if _restore_session():
        return True

    render_html(
        """
        <div class="ft-card" style="padding:1.15rem 1.1rem; margin-top:1.8rem;">
            <div class="ft-kicker">Acceso privado</div>
            <div class="ft-row-title" style="font-size:1.8rem; margin-top:0.1rem;">Inicia sesión</div>
            <div class="ft-note" style="margin-top:0.3rem;">Entra con tu usuario de Supabase Auth.</div>
        </div>
        """
    )

    with st.form("login_form"):
        email = st.text_input("Email")
        password = st.text_input("Contraseña", type="password")
        submitted = st.form_submit_button("Entrar", use_container_width=True)

    if submitted:
        if not email.strip() or not password:
            st.warning("Introduce email y contraseña.")
            return False

        try:
            response = get_supabase_client().auth.sign_in_with_password(
                {
                    "email": email.strip(),
                    "password": password,
                }
            )
            session = getattr(response, "session", None)
            user = getattr(response, "user", None)
            if not session or not user:
                st.error("No se pudo iniciar sesión.")
                return False

            access_token = getattr(session, "access_token", None)
            refresh_token = getattr(session, "refresh_token", None)
            if not access_token or not refresh_token:
                st.error("La sesión no devolvió tokens válidos.")
                return False

            set_supabase_session(access_token, refresh_token)
            _persist_auth_cookies(access_token, refresh_token)
            st.session_state.authenticated = True
            st.session_state.auth_user_email = getattr(user, "email", email.strip())
            st.rerun()
        except Exception as exc:
            st.error(f"No se pudo iniciar sesión: {exc}")

    return False
