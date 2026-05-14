from datetime import date

import pandas as pd
import streamlit as st

from src.services import (
    get_body_weight_entries,
    get_dashboard_summary,
    get_workout_detail,
    get_workout_history_summary,
)
from src.ui import (
    PRIMARY,
    SUCCESS,
    TRAINING_TYPE_COLORS,
    icon_svg,
    render_action_links,
    render_distribution_bar,
    render_empty_state,
    render_html,
    render_inline_count,
    render_workout_list_card,
    render_metric_card,
    render_page_header,
    render_quick_action_card,
    render_section_label,
    render_type_pills,
)
from src.utils import format_date


def _weekday_label():
    names = ["lun", "mar", "mié", "jue", "vie", "sáb", "dom"]
    today = date.today()
    months = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"]
    return f'{names[today.weekday()]}, {today.day} de {months[today.month - 1]}'


def _sparkline_values(items: list[dict], key: str) -> list[float]:
    values = []
    for item in items:
        value = item.get(key)
        if value is not None:
            values.append(float(value))
    return values[-6:]


def _distribution_from_history(rows: list[dict]) -> list[tuple[str, float]]:
    counts = {name: 0 for name in TRAINING_TYPE_COLORS}
    recent = rows[:8]
    total = 0
    for row in recent:
        for raw_name in (row.get("training_types") or "").split(","):
            name = raw_name.strip()
            if name:
                counts[name] = counts.get(name, 0) + 1
                total += 1
    if total == 0:
        return []
    return [(name, (count / total) * 100) for name, count in counts.items() if count > 0]


def render():
    summary = {}
    history_rows = []
    body_weights = []
    last_workout_detail = None

    try:
        summary = get_dashboard_summary()
        history_rows = get_workout_history_summary()
        body_weights = get_body_weight_entries()
        if summary.get("last_workout"):
            last_workout_detail = get_workout_detail(summary["last_workout"]["id"])
    except Exception as exc:
        st.error(f"No se pudo cargar el resumen inicial: {exc}")

    render_page_header(
        "Resumen",
        f'{_weekday_label()} · {summary.get("workouts_this_week", 0)} entrenamientos esta semana',
    )

    recent_workouts = summary.get("recent_workouts", [])
    last_weight = summary.get("last_body_weight")
    weight_values = [float(item.get("weight") or 0) for item in reversed(body_weights[:6])]
    volume_values = _sparkline_values(recent_workouts, "total_volume")
    workout_count_values = list(range(max(1, len(recent_workouts) - 3), len(recent_workouts) + 1))
    exercise_sparkline = [max(1, summary.get("total_exercises", 0) - 2), max(1, summary.get("total_exercises", 0) - 1), max(1, summary.get("total_exercises", 0))]

    grid1, grid2 = st.columns(2)
    with grid1:
        render_metric_card(
            "Entrenamientos",
            str(summary.get("total_workouts", 0)),
            delta=f'+{summary.get("workouts_this_week", 0)} últ. 7d',
            color=PRIMARY,
            sparkline=workout_count_values,
            icon_html=icon_svg("exercise", size=16, color=PRIMARY),
        )
    with grid2:
        render_metric_card(
            "Volumen 30d",
            f'{float(summary.get("recent_total_volume") or 0):.0f}',
            delta="kg·rep",
            color="#7B5CD6",
            sparkline=volume_values,
            icon_html=icon_svg("chart", size=16, color="#7B5CD6"),
        )

    grid3, grid4 = st.columns(2)
    with grid3:
        render_metric_card(
            "Peso corporal",
            f'{float(last_weight["weight"]):.1f}' if last_weight else "—",
            delta=f'último {format_date(last_weight["entry_date"])}' if last_weight else "sin registros",
            color="#3A82C4",
            suffix="kg" if last_weight else None,
            sparkline=weight_values,
            icon_html=icon_svg("weight", size=21, color="#3A82C4"),
        )
    with grid4:
        render_metric_card(
            "Ejercicios",
            str(summary.get("total_exercises", 0)),
            delta="catálogo",
            color=SUCCESS,
            sparkline=exercise_sparkline,
            icon_html=icon_svg("exercise", size=16, color=SUCCESS),
        )

    render_action_links(
        [
            {
                "title": "Empezar entrenamiento",
                "subtitle": "Registrar una nueva sesión",
                "view": "nuevo",
                "icon_html": icon_svg("exercise", size=20, color="#FFFFFF"),
                "primary": True,
                "full_width": True,
            },
            {
                "title": "Registrar peso",
                "subtitle": "Añadir un registro",
                "view": "peso",
                "icon_html": icon_svg("weight", size=20, color="#3A82C4"),
            },
            {
                "title": "Ver progreso",
                "subtitle": "Revisar evolución",
                "view": "progresion",
                "icon_html": icon_svg("chart", size=20, color="#7B5CD6"),
            },
        ]
    )

    if last_workout_detail:
        render_section_label("Último entrenamiento")
        exercise_blocks = []
        for item in last_workout_detail.get("workout_exercises", [])[:4]:
            exercise_blocks.append(
                f"""
                <div style="padding:0.8rem 0 0.55rem 0; border-top:1px solid rgba(31, 27, 22, 0.08);">
                    <div style="font-weight:800; font-size:1.02rem;">{item["exercise_name"]}</div>
                    {render_type_pills([item["training_type_name"]])}
                    <div class="ft-note" style="margin-top:0.3rem;">{item.get("set_count", 0)} series · {float(item.get("total_volume") or 0):.0f} vol</div>
                </div>
                """
            )
        render_html(
            f"""
            <div class="ft-card">
                <div class="ft-kicker">{format_date(last_workout_detail["workout_date"])}</div>
                <div class="ft-row-title" style="font-size:1.45rem;">{last_workout_detail["name"]}</div>
                {''.join(exercise_blocks) if exercise_blocks else '<div class="ft-note" style="margin-top:0.6rem;">Sin ejercicios todavía.</div>'}
            </div>
            """
        )
    else:
        render_section_label("Último entrenamiento")
        render_empty_state("Sin sesiones recientes", "Empieza un entrenamiento nuevo para tener aquí tu último resumen.")

    distribution = _distribution_from_history(history_rows)
    if distribution:
        render_section_label("Distribución 30 días")
        render_distribution_bar(distribution, "Distribución aproximada por tipos recientes")

    render_section_label("Accesos rápidos")
    quick1, quick2 = st.columns(2)
    with quick1:
        render_quick_action_card(
            "Ejercicios",
            "Gestionar catálogo",
            SUCCESS,
            icon_svg("exercise", size=20, color=SUCCESS),
            "ejercicios",
        )
    with quick2:
        render_quick_action_card(
            "Más opciones",
            "Peso, progreso y ajustes",
            PRIMARY,
            icon_svg("more", size=20, color=PRIMARY),
            "mas",
        )

    if history_rows:
        render_section_label("Últimas sesiones")
        render_inline_count(f"{len(history_rows[:3])} sesiones recientes")
        for row in history_rows[:3]:
            workout_date = row.get("workout_date")
            day = str(pd.to_datetime(workout_date).day).zfill(2) if workout_date else "—"
            month = (
                pd.to_datetime(workout_date).strftime("%b").upper().replace(".", "")[:3]
                if workout_date
                else "—"
            )
            pills = [item.strip() for item in (row.get("training_types") or "").split(",") if item.strip()]
            render_workout_list_card(
                title=row.get("name") or "Entrenamiento",
                day=day,
                month=month,
                pills=pills[:2],
                right_title=f'{row.get("total_sets", 0)} series',
                right_subtitle=f'{float(row.get("total_volume") or 0):.0f} vol',
                subtitle=row.get("exercise_names") or None,
            )
    else:
        render_section_label("Últimas sesiones")
        render_empty_state("Todavía no hay sesiones", "Cuando registres entrenamientos aparecerán aquí para repasarlos rápido.")
