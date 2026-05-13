from pathlib import Path
import runpy

import streamlit as st

from src.home_page import render as render_home
from src.ui import apply_base_styles, render_navigation


st.set_page_config(
    page_title="Fitness Tracker",
    page_icon="🏋️",
    layout="centered",
    initial_sidebar_state="expanded",
)


def _current_view() -> str:
    raw_value = st.query_params.get("view", "principal")
    view = raw_value[0] if isinstance(raw_value, list) else raw_value
    aliases = {
        "peso-corporal": "peso",
        "nuevo-entrenamiento": "nuevo",
    }
    return aliases.get(view, view)


PROJECT_ROOT = Path(__file__).parent
PAGE_MAP = {
    "principal": None,
    "nuevo": PROJECT_ROOT / "pages" / "1_Nuevo_entrenamiento.py",
    "historial": PROJECT_ROOT / "pages" / "2_Historial.py",
    "ejercicios": PROJECT_ROOT / "pages" / "3_Ejercicios.py",
    "progresion": PROJECT_ROOT / "pages" / "4_Progresion.py",
    "peso": PROJECT_ROOT / "pages" / "5_Peso_corporal.py",
    "mas": PROJECT_ROOT / "pages" / "6_Configuracion.py",
    "configuracion": PROJECT_ROOT / "pages" / "6_Configuracion.py",
}


current_view = _current_view()
if current_view not in PAGE_MAP:
    current_view = "principal"
    st.query_params["view"] = "principal"

apply_base_styles()

nav_view = "mas" if current_view == "configuracion" else current_view
nav_col, content_col = st.columns([1.15, 4], gap="large")

with nav_col:
    selected_view = render_navigation(nav_view)
    if selected_view != nav_view:
        st.query_params["view"] = selected_view
        st.rerun()

with content_col:
    if current_view == "principal":
        render_home()
    else:
        runpy.run_path(str(PAGE_MAP[current_view]), run_name="__main__")
