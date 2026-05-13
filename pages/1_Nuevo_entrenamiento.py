from datetime import date

import streamlit as st

from src.services import (
    add_exercise_to_workout,
    add_set,
    copy_workout_into_workout,
    create_workout,
    delete_workout_exercise,
    duplicate_workout_exercise,
    get_exercises,
    get_recent_workouts,
    get_training_types,
    get_workout_detail,
)
from src.ui import render_html, render_page_header, render_section_label, render_type_pills, type_color
from src.utils import safe_float, safe_int, validate_set_data


try:
    recent_workouts = get_recent_workouts()
    exercises = get_exercises()
    training_types = get_training_types()
except Exception as exc:
    st.error(f"No se pudieron cargar los datos iniciales: {exc}")
    st.stop()

training_type_map = {item["name"]: item["id"] for item in training_types}
training_type_by_id = {item["id"]: item["name"] for item in training_types}
exercise_map = {item["name"]: item["id"] for item in exercises}
exercise_rows_by_name = {item["name"]: item for item in exercises}
recent_workout_options = {f'{item["workout_date"]} - {item["name"]}': item["id"] for item in recent_workouts}

if "active_workout_id" not in st.session_state:
    st.session_state.active_workout_id = None
if "active_workout_name" not in st.session_state:
    st.session_state.active_workout_name = ""
if "workout_set_count" not in st.session_state:
    st.session_state.workout_set_count = 4
if "suggested_workout_name" not in st.session_state:
    st.session_state.suggested_workout_name = ""
if "show_import_box" not in st.session_state:
    st.session_state.show_import_box = False


def _summary_pill(label: str, value: str):
    render_html(
        f"""
        <div class="ft-card" style="padding:0.72rem 0.9rem; margin-bottom:0;">
            <div class="ft-kicker" style="margin-bottom:0.18rem; font-size:0.68rem;">{label}</div>
            <div style="font-size:1.05rem; font-weight:800; color:#1F1B16;">{value}</div>
        </div>
        """
    )


def _exercise_card(item: dict):
    sets = item.get("sets", [])
    set_rows = []
    for set_item in sets:
        weight_label = f'{float(set_item["weight"]):.1f} kg' if set_item.get("weight") is not None else "—"
        reps_label = str(set_item["reps"]) if set_item.get("reps") is not None else "—"
        set_rows.append(
            f"""
            <div style="display:grid; grid-template-columns:30px 1fr 1fr; gap:0.55rem; align-items:center; padding:0.42rem 0;">
                <div style="width:24px; height:24px; border-radius:999px; background:#F0ECE6; color:#8B7D70; display:flex; align-items:center; justify-content:center; font-size:0.76rem; font-weight:800;">{set_item.get("set_number")}</div>
                <div style="font-size:0.96rem; font-weight:600; color:#1F1B16;">{weight_label}</div>
                <div style="font-size:0.96rem; font-weight:600; color:#1F1B16;">{reps_label}</div>
            </div>
            """
        )

    notes_line = f'<div class="ft-note" style="margin-top:0.35rem;">{item.get("notes")}</div>' if item.get("notes") else ""
    render_html(
        f"""
        <div class="ft-card" style="padding:0; overflow:hidden;">
            <div style="padding:1rem 1rem 0.8rem;">
                <div style="display:flex; justify-content:space-between; gap:0.9rem; align-items:flex-start;">
                    <div style="min-width:0;">
                        <div class="ft-row-title" style="font-size:1.08rem;">{item["exercise_name"]}</div>
                        {render_type_pills([item["training_type_name"]])}
                        <div class="ft-note" style="margin-top:0.28rem;">{item.get("set_count", 0)} series · {float(item.get("total_volume") or 0):.0f} vol</div>
                        {notes_line}
                    </div>
                    <div style="text-align:right; color:#B0A498; font-size:0.84rem; font-weight:700; white-space:nowrap;">#{item.get("exercise_order", '')}</div>
                </div>
            </div>
            <div style="border-top:1px solid rgba(31,27,22,0.08); padding:0.45rem 1rem 0.75rem;">
                <div style="display:grid; grid-template-columns:30px 1fr 1fr; gap:0.55rem; font-size:0.66rem; font-weight:800; letter-spacing:0.08em; text-transform:uppercase; color:#9A8F84; padding-bottom:0.2rem;">
                    <div>#</div>
                    <div>Peso</div>
                    <div>Reps</div>
                </div>
                {''.join(set_rows) if set_rows else '<div class="ft-note">Sin series todavía.</div>'}
            </div>
        </div>
        """
    )


if not st.session_state.active_workout_id:
    render_page_header("Nuevo entrenamiento")

    with st.container(border=True):
        with st.form("create_workout_form"):
            workout_name = st.text_input(
                "Nombre del entrenamiento",
                value=st.session_state.suggested_workout_name,
                placeholder="Nombre del entrenamiento",
            )
            workout_date = st.date_input("Fecha", value=date.today())
            workout_notes = st.text_area("Notas", placeholder="Añadir notas")
            create_workout_submit = st.form_submit_button("Empezar entrenamiento", use_container_width=True)

        if create_workout_submit:
            if not workout_name.strip():
                st.warning("El nombre del entrenamiento es obligatorio.")
            else:
                try:
                    workout = create_workout(str(workout_date), workout_name, workout_notes)
                    st.session_state.active_workout_id = workout["id"]
                    st.session_state.active_workout_name = workout["name"]
                    st.success("Entrenamiento creado.")
                    st.rerun()
                except Exception as exc:
                    st.error(f"No se pudo crear el entrenamiento: {exc}")

    render_section_label("Continuar uno reciente")
    with st.container(border=True):
        selected_recent_label = st.selectbox("Entrenamientos recientes", ["Selecciona uno"] + list(recent_workout_options.keys()))
        if st.button("Continuar", use_container_width=True):
            if selected_recent_label == "Selecciona uno":
                st.warning("Selecciona un entrenamiento reciente.")
            else:
                st.session_state.active_workout_id = recent_workout_options[selected_recent_label]
                st.session_state.active_workout_name = selected_recent_label.split(" - ", 1)[1]
                st.rerun()
    st.stop()

detail = get_workout_detail(st.session_state.active_workout_id)
render_page_header(detail.get("name", st.session_state.active_workout_name or "Entrenamiento"), "Sesión activa")

col_a, col_b, col_c = st.columns(3)
with col_a:
    _summary_pill("Ejercicios", str(detail.get("exercise_count", 0)))
with col_b:
    _summary_pill("Series", str(detail.get("total_sets", 0)))
with col_c:
    _summary_pill("Volumen", f'{float(detail.get("total_volume") or 0):.0f}')

actions_1, actions_2 = st.columns(2)
with actions_1:
    if st.button("Importar reciente", use_container_width=True):
        st.session_state.show_import_box = not st.session_state.get("show_import_box", False)
with actions_2:
    if st.button("Cerrar sesión", use_container_width=True):
        st.session_state.active_workout_id = None
        st.session_state.active_workout_name = ""
        st.rerun()

if st.session_state.get("show_import_box"):
    with st.container(border=True):
        import_options = {
            f'{item["workout_date"]} - {item["name"]}': item["id"]
            for item in recent_workouts
            if item["id"] != st.session_state.active_workout_id
        }
        selected_import = st.selectbox("Copiar ejercicios de", ["Selecciona uno"] + list(import_options.keys()))
        if st.button("Importar ejercicios", use_container_width=True):
            if selected_import == "Selecciona uno":
                st.warning("Selecciona un entrenamiento.")
            else:
                try:
                    copy_workout_into_workout(import_options[selected_import], st.session_state.active_workout_id)
                    st.success("Ejercicios importados.")
                    st.rerun()
                except Exception as exc:
                    st.error(f"No se pudieron importar los ejercicios: {exc}")

render_section_label("Añadir ejercicio")
with st.container(border=True):
    default_name = next(iter(exercise_map.keys()), None)
    selected_exercise_name = st.selectbox("Ejercicio", list(exercise_map.keys()) if exercise_map else ["No hay ejercicios"], disabled=not exercise_map)

    default_type_name = "Otro"
    exercise_row = exercise_rows_by_name.get(selected_exercise_name) if selected_exercise_name else None
    if exercise_row and exercise_row.get("default_training_type_name") in training_type_map:
        default_type_name = exercise_row["default_training_type_name"]
    if default_type_name not in training_type_map:
        default_type_name = next(iter(training_type_map.keys()))

    selected_training_type_name = st.selectbox(
        "Tipo real usado hoy",
        list(training_type_map.keys()),
        index=list(training_type_map.keys()).index(default_type_name) if default_type_name in training_type_map else 0,
    )
    st.session_state.workout_set_count = st.number_input(
        "Número de series",
        min_value=1,
        max_value=8,
        value=int(st.session_state.workout_set_count),
        step=1,
    )
    exercise_notes = st.text_input("Notas del ejercicio", placeholder="Opcional")

    with st.form("add_exercise_form"):
        sets_payload = []
        for set_index in range(int(st.session_state.workout_set_count)):
            set_cols = st.columns([0.6, 1.2, 1.2])
            set_cols[0].markdown(f"**{set_index + 1}**")
            weight = set_cols[1].number_input(
                f"Peso {set_index + 1}",
                min_value=0.0,
                step=0.5,
                value=0.0,
                key=f"nw_weight_{set_index}",
                label_visibility="collapsed",
            )
            reps = set_cols[2].number_input(
                f"Reps {set_index + 1}",
                min_value=0,
                step=1,
                value=0,
                key=f"nw_reps_{set_index}",
                label_visibility="collapsed",
            )
            sets_payload.append(
                {
                    "set_number": set_index + 1,
                    "weight": safe_float(weight) if weight > 0 else None,
                    "reps": safe_int(reps) if reps > 0 else None,
                    "duration_seconds": None,
                    "distance_meters": None,
                    "height_cm": None,
                    "intensity_notes": None,
                    "notes": None,
                }
            )
        add_submit = st.form_submit_button("Añadir ejercicio", use_container_width=True)

if add_submit:
    validation_errors = []
    for set_data in sets_payload:
        is_valid, validation_message = validate_set_data(set_data)
        if not is_valid:
            validation_errors.append(f'Serie {set_data["set_number"]}: {validation_message}')

    if validation_errors:
        for message in validation_errors:
            st.warning(message)
    else:
        try:
            workout_exercise = add_exercise_to_workout(
                workout_id=st.session_state.active_workout_id,
                exercise_id=exercise_map[selected_exercise_name],
                training_type_id=training_type_map[selected_training_type_name],
                exercise_order=len(detail.get("workout_exercises", [])) + 1,
                notes=exercise_notes,
            )
            for set_data in sets_payload:
                add_set(
                    workout_exercise_id=workout_exercise["id"],
                    set_number=set_data["set_number"],
                    weight=set_data["weight"],
                    reps=set_data["reps"],
                    duration_seconds=None,
                    distance_meters=None,
                    height_cm=None,
                    intensity_notes=None,
                    notes=None,
                )
            st.success("Ejercicio añadido al entrenamiento.")
            st.rerun()
        except Exception as exc:
            st.error(f"No se pudo guardar el ejercicio: {exc}")

render_section_label("Ejercicios añadidos")
if not detail.get("workout_exercises"):
    render_html(
        """
        <div class="ft-card" style="text-align:center; padding:1.2rem 1rem;">
            <div class="ft-note">Aún no has añadido ejercicios a esta sesión.</div>
        </div>
        """
    )
else:
    for item in detail["workout_exercises"]:
        _exercise_card(item)
        action1, action2 = st.columns(2)
        with action1:
            if st.button(f'Duplicar {item["exercise_name"]}', key=f'dup_{item["id"]}', use_container_width=True):
                try:
                    duplicate_workout_exercise(item["id"], st.session_state.active_workout_id)
                    st.success("Ejercicio duplicado.")
                    st.rerun()
                except Exception as exc:
                    st.error(f"No se pudo duplicar el ejercicio: {exc}")
        with action2:
            if st.button(f'Borrar {item["exercise_name"]}', key=f'del_{item["id"]}', use_container_width=True):
                try:
                    delete_workout_exercise(item["id"], st.session_state.active_workout_id)
                    st.success("Ejercicio eliminado.")
                    st.rerun()
                except Exception as exc:
                    st.error(f"No se pudo borrar el ejercicio: {exc}")
