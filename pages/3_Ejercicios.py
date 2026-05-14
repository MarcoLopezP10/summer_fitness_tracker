import streamlit as st

from src.services import create_exercise, get_exercises, get_training_types, get_workout_history_summary
from src.ui import render_empty_state, render_html, render_inline_count, render_page_header, render_section_label, render_type_pills, type_color

render_page_header("Ejercicios", "Tu catálogo base para trabajar rápido cada día.")

try:
    training_types = get_training_types()
    workout_history = get_workout_history_summary()
except Exception as exc:
    st.error(f"No se pudieron cargar los datos de ejercicios: {exc}")
    st.stop()

training_type_options = {"Sin tipo por defecto": None}
training_type_options.update({item["name"]: item["id"] for item in training_types})

if "show_create_exercise" not in st.session_state:
    st.session_state.show_create_exercise = False

top_left, top_right = st.columns([3, 2])
with top_right:
    if st.button("Nuevo ejercicio", use_container_width=True):
        st.session_state.show_create_exercise = not st.session_state.show_create_exercise

if st.session_state.show_create_exercise:
    with st.container(border=True):
        with st.form("create_exercise_form"):
            st.subheader("Nuevo ejercicio")
            exercise_name = st.text_input("Nombre del ejercicio", placeholder="Ej. Sentadilla con salto")
            default_training_type_name = st.selectbox("Tipo por defecto", list(training_type_options.keys()))
            exercise_notes = st.text_area("Notas", placeholder="Opcional")
            create_exercise_submit = st.form_submit_button("Guardar ejercicio", use_container_width=True)

    if create_exercise_submit:
        if not exercise_name.strip():
            st.warning("El nombre del ejercicio es obligatorio.")
        else:
            try:
                create_exercise(
                    name=exercise_name,
                    default_training_type_id=training_type_options[default_training_type_name],
                    notes=exercise_notes,
                )
                st.success("Ejercicio creado correctamente.")
                st.rerun()
            except Exception as exc:
                st.error(f"No se pudo crear el ejercicio: {exc}")

render_section_label("Catálogo")
search_col, filter_col = st.columns(2)
with search_col:
    search_term = st.text_input("Buscar ejercicio", placeholder="Buscar ejercicio")
with filter_col:
    filter_options = {"Todos": "__all__", "Sin tipo por defecto": "__none__"}
    filter_options.update({item["name"]: item["id"] for item in training_types})
    selected_filter_name = st.selectbox("Filtrar por tipo por defecto", list(filter_options.keys()))

try:
    filter_value = filter_options[selected_filter_name]
    exercises = get_exercises(None if filter_value == "__all__" else filter_value)
except Exception as exc:
    st.error(f"No se pudieron cargar los ejercicios: {exc}")
    st.stop()

if search_term.strip():
    query = search_term.strip().lower()
    exercises = [item for item in exercises if query in item["name"].lower()]

if not exercises:
    render_empty_state("Sin resultados", "No hay ejercicios que coincidan con ese filtro.")
    st.stop()

render_inline_count(f"{len(exercises)} ejercicios visibles")

usage_counts = {}
for row in workout_history:
    for name in [part.strip() for part in (row.get("exercise_names") or "").split(",") if part.strip()]:
        usage_counts[name] = usage_counts.get(name, 0) + 1

for item in exercises:
    type_name = item.get("default_training_type_name")
    color = type_color(type_name if type_name != "Sin tipo por defecto" else "Otro")
    pills = [type_name] if type_name and type_name != "Sin tipo por defecto" else []
    uses = usage_counts.get(item["name"], 0)
    pills_html = render_type_pills(pills) if pills else '<div class="ft-note" style="margin-top:0.35rem; font-style:italic;">Sin tipo por defecto</div>'
    notes_html = f'<div class="ft-note" style="margin-top:0.35rem;">{item.get("notes")}</div>' if item.get("notes") else ""
    usage_html = f'<div class="ft-note" style="margin-top:0.18rem;">{uses} usos</div>' if uses else '<div class="ft-note" style="margin-top:0.18rem;">Aún sin registrar</div>'
    render_html(
        f"""
        <div class="ft-card" style="padding:0.9rem 1rem;">
            <div style="display:flex; align-items:flex-start; gap:0.9rem;">
                <div style="width:46px; height:46px; border-radius:14px; background:{color}18; color:{color}; display:flex; align-items:center; justify-content:center; flex-shrink:0;">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
                        <path d="M3 12h4"></path>
                        <path d="M17 12h4"></path>
                        <path d="M7 9v6"></path>
                        <path d="M17 9v6"></path>
                        <path d="M9 8h6"></path>
                        <path d="M9 16h6"></path>
                    </svg>
                </div>
                <div style="flex:1; min-width:0;">
                    <div class="ft-row-title" style="font-size:1.04rem;">{item["name"]}</div>
                    {pills_html}
                    {usage_html}
                    {notes_html}
                </div>
            </div>
        </div>
        """
    )
