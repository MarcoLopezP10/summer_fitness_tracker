import pandas as pd
import streamlit as st

from src.services import get_training_types, get_workout_detail, get_workout_history_summary
from src.ui import render_html, render_page_header, render_section_label, render_type_pills, render_workout_list_card
from src.utils import format_date


def _group_label(date_value):
    parsed = pd.to_datetime(date_value).date()
    today = pd.Timestamp.today().date()
    diff = (today - parsed).days
    if diff <= 6:
        return "Esta semana"
    if diff <= 13:
        return "La semana pasada"
    if parsed.month == today.month and parsed.year == today.year:
        return "Este mes"
    if (today.month == 1 and parsed.month == 12 and parsed.year == today.year - 1) or (
        parsed.month == today.month - 1 and parsed.year == today.year
    ):
        return "Mes pasado"
    return "Anteriores"


def _metric_pill(label: str, value: str):
    render_html(
        f"""
        <div class="ft-card" style="padding:0.8rem 0.9rem; margin-bottom:0;">
            <div class="ft-kicker" style="margin-bottom:0.18rem; font-size:0.68rem;">{label}</div>
            <div style="font-size:1.2rem; font-weight:800; color:#1F1B16;">{value}</div>
        </div>
        """
    )


render_page_header("Historial", "Tus sesiones agrupadas para revisarlas rápido y con contexto.")

try:
    workouts = get_workout_history_summary()
    training_types = get_training_types()
except Exception as exc:
    st.error(f"No se pudieron cargar los entrenamientos: {exc}")
    st.stop()

if not workouts:
    st.warning("Todavía no hay entrenamientos registrados.")
    st.stop()

type_names = ["Todos"] + [item["name"] for item in training_types]
filter_col, search_col = st.columns(2)
selected_type = filter_col.selectbox("Filtrar por tipo", type_names)
search_term = search_col.text_input("Buscar", placeholder="Ej. sentadilla")

filtered = workouts
if selected_type != "Todos":
    filtered = [item for item in filtered if selected_type in (item.get("training_types") or "")]
if search_term.strip():
    query = search_term.strip().lower()
    filtered = [
        item
        for item in filtered
        if query in item["name"].lower() or query in (item.get("exercise_names") or "").lower()
    ]

if not filtered:
    st.warning("No hay sesiones que coincidan con esos filtros.")
    st.stop()

sections = {}
for item in filtered:
    sections.setdefault(_group_label(item["workout_date"]), []).append(item)

for label, items in sections.items():
    render_section_label(label)
    for item in items:
        parsed = pd.to_datetime(item["workout_date"])
        pills = [name.strip() for name in (item.get("training_types") or "").split(",") if name.strip()]
        render_workout_list_card(
            title=item["name"],
            day=parsed.strftime("%d"),
            month=parsed.strftime("%b").upper(),
            pills=pills or ["Otro"],
            right_title=f'{item.get("total_sets", 0)} series',
            right_subtitle=f'{float(item.get("total_volume") or 0)/1000:.1f} t vol' if item.get("total_volume") else "0 vol",
            subtitle=item.get("exercise_names") or None,
        )

render_section_label("Detalle")
workout_options = {f'{item["workout_date"]} - {item["name"]}': item["id"] for item in filtered}
selected_workout_label = st.selectbox("Selecciona un entrenamiento", list(workout_options.keys()))

try:
    workout_detail = get_workout_detail(workout_options[selected_workout_label])
except Exception as exc:
    st.error(f"No se pudo cargar el detalle del entrenamiento: {exc}")
    st.stop()

render_html(
    f"""
    <div class="ft-card">
        <div class="ft-row-title" style="font-size:1.7rem;">{workout_detail["name"]}</div>
        <div class="ft-note" style="margin-top:0.22rem;">{format_date(workout_detail["workout_date"])}</div>
        <div class="ft-note" style="margin-top:0.55rem;">{workout_detail.get("notes") or "Sin notas generales."}</div>
    </div>
    """
)

if not workout_detail.get("workout_exercises"):
    st.warning("Este entrenamiento no tiene ejercicios asociados todavía.")
    st.stop()

metric_1, metric_2, metric_3 = st.columns(3)
with metric_1:
    _metric_pill("Ejercicios", str(workout_detail.get("exercise_count", 0)))
with metric_2:
    _metric_pill("Series", str(workout_detail.get("total_sets", 0)))
with metric_3:
    _metric_pill("Volumen", f'{float(workout_detail.get("total_volume") or 0):.0f}')

for item in workout_detail["workout_exercises"]:
    notes_html = f'<div class="ft-note" style="margin-top:0.45rem;">{item.get("notes")}</div>' if item.get("notes") else ""
    render_html(
        f"""
        <div class="ft-card" style="padding:0.95rem 1rem;">
            <div class="ft-row-title" style="font-size:1.05rem;">{item["exercise_name"]}</div>
            {render_type_pills([item["training_type_name"]])}
            <div class="ft-note" style="margin-top:0.3rem;">máx {float(item.get("max_weight") or 0):.1f} kg · {item.get("set_count", 0)} series · {float(item.get("total_volume") or 0):.0f} vol</div>
            {notes_html}
        </div>
        """
    )

    set_df = pd.DataFrame(item.get("sets", []))
    if set_df.empty:
        continue

    visible_columns = [("set_number", "Serie")]
    optional_columns = [
        ("weight", "Peso"),
        ("reps", "Reps"),
        ("duration_seconds", "Duración"),
        ("distance_meters", "Distancia"),
        ("height_cm", "Altura"),
        ("intensity_notes", "Intensidad"),
        ("notes", "Notas"),
        ("volume", "Volumen"),
    ]
    for source, label in optional_columns:
        if source in set_df.columns and set_df[source].notna().any():
            visible_columns.append((source, label))

    display_df = set_df[[source for source, _ in visible_columns]].rename(columns=dict(visible_columns))
    st.dataframe(display_df, use_container_width=True, hide_index=True)
