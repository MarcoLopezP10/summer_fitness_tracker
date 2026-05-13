import streamlit as st

from src.auth import auth_enabled, logout
from src.services import get_body_weight_entries, get_dashboard_summary, get_training_types, get_workout_history_summary
from src.ui import icon_svg, render_html, render_page_header, render_quick_action_card, render_section_label, type_color

summary = {}
training_types = []
history = []
body_weights = []

try:
    summary = get_dashboard_summary()
    training_types = get_training_types()
    history = get_workout_history_summary()
    body_weights = get_body_weight_entries()
except Exception as exc:
    st.error(f"No se pudo cargar la pantalla de más: {exc}")


view_raw = st.query_params.get("view", "mas")
current_view = view_raw[0] if isinstance(view_raw, list) else view_raw

total_workouts = summary.get("total_workouts", 0)
total_exercises = summary.get("total_exercises", 0)
total_series = sum(item.get("total_sets", 0) for item in history)


def _project_card():
    render_html(
        """
        <div class="ft-card">
            <div style="display:flex; gap:0.9rem; align-items:flex-start;">
                <div style="width:56px; height:56px; border-radius:18px; background:#fce8e1; display:flex; align-items:center; justify-content:center; color:#E26A4A;">
                    {icon_svg("fire", size=24, color="#E26A4A")}
                </div>
                <div style="flex:1;">
                    <div class="ft-row-title" style="font-size:1.45rem;">fitness_tracker</div>
                    <div class="ft-note">App personal de seguimiento</div>
                    <div class="ft-note" style="margin-top:0.7rem;">Registra entrenamientos por tipo, series con métricas flexibles y la evolución de tu peso corporal.</div>
                </div>
            </div>
        </div>
        """
    )


def _settings_detail():
    render_page_header("Configuración", "Proyecto, tipos de entrenamiento y estado general de tus datos.", "Sobre el proyecto")
    _project_card()

    render_section_label("Tipos de entrenamiento")
    for item in training_types:
        color = type_color(item["name"])
        render_html(
            f"""
            <div class="ft-card" style="padding:0.9rem 1rem;">
                <div style="display:flex; gap:0.9rem; align-items:flex-start;">
                    <div style="width:5px; border-radius:999px; min-height:60px; background:{color};"></div>
                    <div>
                        <div class="ft-row-title" style="font-size:1.15rem;">{item["name"]}</div>
                        <div class="ft-note" style="margin-top:0.25rem;">{item.get("description") or ""}</div>
                    </div>
                </div>
            </div>
            """
        )

    render_section_label("Datos")
    col1, col2 = st.columns(2)
    col1.metric("Entrenamientos", total_workouts)
    col2.metric("Ejercicios", total_exercises)
    col3, col4 = st.columns(2)
    col3.metric("Registros de peso", len(body_weights))
    col4.metric("Series", total_series)

    render_section_label("Stack")
    render_html(
        """
        <div class="ft-card">
            <div class="ft-row-title">Tecnología</div>
            <div class="ft-note" style="margin-top:0.35rem;">Python · Streamlit · Supabase PostgreSQL · Pandas · Plotly</div>
        </div>
        """
    )

    if auth_enabled():
        if st.button("Cerrar sesión", use_container_width=True, key="config_logout_button"):
            logout()
            st.rerun()


def _more_hub():
    render_page_header("Más", f"{total_workouts} entrenamientos · {total_exercises} ejercicios")

    render_quick_action_card(
        "Ejercicios",
        f"{total_exercises} en catálogo",
        "#3DA37A",
        icon_svg("exercise", size=22, color="#3DA37A"),
        "ejercicios",
    )
    render_quick_action_card(
        "Peso corporal",
        f"{len(body_weights)} registros",
        "#3A82C4",
        icon_svg("weight", size=22, color="#3A82C4"),
        "peso",
    )
    render_quick_action_card(
        "Progresión",
        "Evolución por ejercicio",
        "#7B5CD6",
        icon_svg("chart", size=22, color="#7B5CD6"),
        "progresion",
    )
    render_quick_action_card(
        "Configuración",
        "Tipos, info y métricas",
        "#8A8378",
        icon_svg("settings", size=22, color="#8A8378"),
        "configuracion",
    )

    render_html(
        """
        <div style="text-align:center; padding:1.2rem 0 1.6rem 0;">
            <div style="font-weight:800; font-size:1.35rem; color:#1F1B16;">fitness_tracker</div>
            <div class="ft-note" style="margin-top:0.2rem;">v0.1 · herramienta personal</div>
        </div>
        """
    )


if current_view == "configuracion":
    _settings_detail()
else:
    _more_hub()
