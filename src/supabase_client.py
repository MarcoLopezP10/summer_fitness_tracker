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


@st.cache_resource
def get_supabase_client() -> Client:
    url = _get_secret_value("SUPABASE_URL", "NEXT_PUBLIC_SUPABASE_URL")
    key = _get_secret_value("SUPABASE_KEY", "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY")
    return create_client(url, key)
