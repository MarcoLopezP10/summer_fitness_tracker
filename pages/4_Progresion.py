import pandas as pd
import streamlit as st

from src.charts import (
    plot_exercise_distance,
    plot_exercise_duration,
    plot_exercise_max_weight,
    plot_exercise_reps,
    plot_exercise_volume,
)
from src.services import get_exercise_progress, get_exercise_progress_insights, get_exercises
from src.ui import render_empty_state, render_html, render_inline_count, render_page_header, render_section_label
from src.utils import build_progress_dataframe, build_unique_name_map, format_date


def _stat_card(label: str, value: str, unit: str | None = None, delta: str | None = None, color: str = "#1F1B16"):
    unit_html = f'<span style="font-size:0.56em; color:#6E6359; font-weight:700;"> {unit}</span>' if unit else ""
    delta_html = f'<div style="font-size:0.86rem; font-weight:700; color:#3DA37A; margin-top:0.28rem;">{delta}</div>' if delta else ""
    render_html(
        f"""
        <div class="ft-card" style="padding:0.9rem 1rem; margin-bottom:0;">
            <div class="ft-kicker" style="margin-bottom:0.22rem; font-size:0.68rem;">{label}</div>
            <div style="font-size:2rem; line-height:1; font-weight:800; color:{color};">{value}{unit_html}</div>
            {delta_html}
        </div>
        """
    )


def _chart_card(title: str, subtitle: str):
    render_html(
        f"""
        <div class="ft-card" style="padding:0.9rem 1rem 0.35rem;">
            <div class="ft-row-title" style="font-size:1rem;">{title}</div>
            <div class="ft-note" style="margin-top:0.18rem;">{subtitle}</div>
        </div>
        """
    )


def _delta_text(current, previous, suffix: str = ""):
    if current is None or previous in (None, 0):
        return None
    diff = float(current) - float(previous)
    pct = (diff / float(previous)) * 100 if previous else 0
    sign = "+" if diff > 0 else ""
    return f"{sign}{diff:.1f}{suffix} ({sign}{pct:.1f}%)"


try:
    exercises = get_exercises()
except Exception as exc:
    st.error(f"No se pudieron cargar los ejercicios: {exc}")
    st.stop()

render_page_header("Progresión", "Revisa la evolución real de cada ejercicio y detecta si estás avanzando.")

if not exercises:
    render_empty_state("Sin ejercicios", "Primero crea ejercicios para revisar su progresión.")
    st.stop()

exercise_options, _exercise_rows_by_label = build_unique_name_map(exercises)
selected_exercise_name = st.selectbox("Ejercicio", list(exercise_options.keys()))

try:
    progress_rows = get_exercise_progress(exercise_options[selected_exercise_name])
    insights = get_exercise_progress_insights(exercise_options[selected_exercise_name])
except Exception as exc:
    st.error(f"No se pudo cargar la progresión del ejercicio: {exc}")
    st.stop()

progress_df = build_progress_dataframe(progress_rows)
if progress_df.empty:
    render_empty_state("Sin progresión todavía", "Este ejercicio aún no tiene suficientes datos para mostrar evolución.")
    st.stop()

render_html(
    f"""
    <div class="ft-card" style="padding:0.95rem 1rem;">
        <div class="ft-kicker">Ejercicio</div>
        <div class="ft-row-title" style="font-size:1.5rem;">{selected_exercise_name}</div>
        <div class="ft-note" style="margin-top:0.3rem;">{len(progress_df)} sesiones registradas para este ejercicio.</div>
    </div>
    """
)

latest = insights.get("latest", {})
first_row = progress_df.iloc[0].to_dict() if not progress_df.empty else {}
best_weight = insights.get("best_weight")
best_volume = insights.get("best_volume")
best_height = insights.get("best_height")

grid_1, grid_2 = st.columns(2)
with grid_1:
    _stat_card(
        "Peso máx",
        f"{best_weight:.1f}" if best_weight is not None else "—",
        "kg" if best_weight is not None else None,
        _delta_text(best_weight, first_row.get("max_weight"), " kg"),
        "#D94B4B",
    )
with grid_2:
    _stat_card(
        "Vol máx",
        f"{best_volume:.0f}" if best_volume is not None else "—",
        None,
        _delta_text(best_volume, first_row.get("total_volume")),
        "#7B5CD6",
    )

grid_3, grid_4 = st.columns(2)
with grid_3:
    _stat_card(
        "Altura máx",
        f"{best_height:.0f}" if best_height is not None else "—",
        "cm" if best_height is not None else None,
        _delta_text(best_height, first_row.get("max_height"), " cm"),
        "#3DA37A",
    )
with grid_4:
    _stat_card(
        "Entrenamientos",
        str(insights.get("total_sessions", 0)),
        None,
        latest.get("workout_name") if latest else None,
        "#1F1B16",
    )

has_weight = progress_df["max_weight"].notna().sum() >= 2 if "max_weight" in progress_df.columns else False
has_volume = progress_df["total_volume"].notna().sum() >= 2 if "total_volume" in progress_df.columns else False
has_reps = progress_df["total_reps"].notna().sum() >= 2 if "total_reps" in progress_df.columns else False
has_duration = progress_df["total_duration"].notna().sum() >= 2 if "total_duration" in progress_df.columns else False
has_distance = progress_df["total_distance"].notna().sum() >= 2 if "total_distance" in progress_df.columns else False

render_section_label("Gráficas")
render_inline_count("Las gráficas solo aparecen cuando hay suficientes datos comparables.")

if has_weight:
    _chart_card("Peso máximo por sesión", "Mayor peso levantado en cada entrenamiento")
    st.plotly_chart(plot_exercise_max_weight(progress_df), use_container_width=True, config={"displayModeBar": False, "responsive": True})

if has_volume:
    _chart_card("Volumen total", "Peso × repeticiones por sesión")
    st.plotly_chart(plot_exercise_volume(progress_df), use_container_width=True, config={"displayModeBar": False, "responsive": True})

if has_reps:
    _chart_card("Repeticiones", "Repeticiones totales por sesión")
    st.plotly_chart(plot_exercise_reps(progress_df), use_container_width=True, config={"displayModeBar": False, "responsive": True})

if has_duration:
    _chart_card("Duración", "Tiempo total registrado por sesión")
    st.plotly_chart(plot_exercise_duration(progress_df), use_container_width=True, config={"displayModeBar": False, "responsive": True})

if has_distance:
    _chart_card("Distancia", "Distancia total registrada por sesión")
    st.plotly_chart(plot_exercise_distance(progress_df), use_container_width=True, config={"displayModeBar": False, "responsive": True})

if not any([has_weight, has_volume, has_reps, has_duration, has_distance]):
    render_empty_state("Sin métricas comparables", "Necesitas al menos dos sesiones con datos repetibles para dibujar gráficas útiles.")

display_df = progress_df.copy()
display_df["workout_date"] = display_df["workout_date"].apply(format_date)
display_df = display_df.rename(
    columns={
        "workout_date": "Fecha",
        "workout_name": "Entrenamiento",
        "training_type_name": "Tipo",
        "max_weight": "Peso máx",
        "total_volume": "Volumen",
        "total_reps": "Reps",
        "set_count": "Series",
        "total_duration": "Duración",
        "total_distance": "Distancia",
        "max_height": "Altura máx",
    }
)

render_section_label("Histórico")
st.dataframe(display_df, use_container_width=True, hide_index=True)
