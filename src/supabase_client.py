import streamlit as st
from supabase import Client, create_client


def _get_secret_value(primary_key: str, fallback_key: str | None = None) -> str:
    value = st.secrets.get(primary_key)
    if value:
        return value

    if fallback_key:
        fallback = st.secrets.get(fallback_key)
        if fallback:
            return fallback

    raise KeyError(f"Falta configurar {primary_key} en .streamlit/secrets.toml")


def _build_client() -> Client:
    url = _get_secret_value("SUPABASE_URL", "NEXT_PUBLIC_SUPABASE_URL")
    key = _get_secret_value("SUPABASE_KEY", "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY")
    return create_client(url, key)


def set_supabase_session(access_token: str, refresh_token: str) -> Client:
    st.session_state.supabase_access_token = access_token
    st.session_state.supabase_refresh_token = refresh_token

    client = _build_client()
    client.auth.set_session(access_token, refresh_token)
    st.session_state.supabase_client = client
    return client


def clear_supabase_session() -> None:
    st.session_state.pop("supabase_access_token", None)
    st.session_state.pop("supabase_refresh_token", None)
    st.session_state.pop("supabase_client", None)


def get_supabase_client() -> Client:
    client = st.session_state.get("supabase_client")
    if client is None:
        client = _build_client()
        access_token = st.session_state.get("supabase_access_token")
        refresh_token = st.session_state.get("supabase_refresh_token")
        if access_token and refresh_token:
            try:
                client.auth.set_session(access_token, refresh_token)
                session_response = client.auth.get_session()
                session = getattr(session_response, "session", None)
                if session:
                    st.session_state.supabase_access_token = getattr(session, "access_token", access_token)
                    st.session_state.supabase_refresh_token = getattr(session, "refresh_token", refresh_token)
            except Exception:
                clear_supabase_session()
                client = _build_client()
        st.session_state.supabase_client = client

    return client
