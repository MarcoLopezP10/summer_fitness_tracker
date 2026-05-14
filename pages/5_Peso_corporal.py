from datetime import date

import streamlit as st
import pandas as pd

from src.charts import plot_body_weight
from src.services import add_body_weight, get_body_weight_entries
from src.ui import render_empty_state, render_html, render_inline_count, render_page_header, render_section_label
from src.utils import format_date

render_page_header("Peso corporal", "Sigue tu tendencia y registra nuevas entradas cuando lo necesites.")

if "show_weight_form" not in st.session_state:
    st.session_state.show_weight_form = False

action_left, action_right = st.columns([3, 2])
with action_right:
    if st.button("Añadir registro", use_container_width=True):
        st.session_state.show_weight_form = not st.session_state.show_weight_form

if st.session_state.get("show_weight_form"):
    with st.container(border=True):
        with st.form("body_weight_form"):
            entry_date = st.date_input("Fecha", value=date.today())
            weight = st.number_input("Peso corporal (kg)", min_value=0.0, step=0.1, value=0.0)
            notes = st.text_area("Notas", placeholder="Opcional")
            submit_body_weight = st.form_submit_button("Guardar peso corporal", use_container_width=True)

    if submit_body_weight:
        if weight <= 0:
            st.warning("Introduce un peso corporal valido.")
        else:
            try:
                add_body_weight(str(entry_date), float(weight), notes)
                st.success("Peso corporal guardado correctamente.")
                st.session_state.show_weight_form = False
                st.rerun()
            except Exception as exc:
                st.error(f"No se pudo guardar el peso corporal: {exc}")

try:
    entries = get_body_weight_entries()
except Exception as exc:
    st.error(f"No se pudieron cargar los registros de peso corporal: {exc}")
    st.stop()

if not entries:
    render_empty_state("Todavía no hay registros", "Guarda tu primer peso para empezar a ver la tendencia.")
    st.stop()

render_inline_count(f"{len(entries)} registros guardados")

entries_df = pd.DataFrame(entries)
entries_df["entry_date"] = pd.to_datetime(entries_df["entry_date"])
entries_df = entries_df.sort_values("entry_date")

current_weight = float(entries_df.iloc[-1]["weight"])
first_weight = float(entries_df.iloc[0]["weight"])
min_weight = float(entries_df["weight"].min())
max_weight = float(entries_df["weight"].max())
delta_from_first = current_weight - first_weight

with st.container(border=True):
    render_html(
        f"""
        <div style="padding:0.15rem 0.1rem 0.3rem 0.1rem;">
            <div class="ft-kicker">Actual</div>
            <div style="display:flex; justify-content:space-between; gap:1rem; align-items:flex-start;">
                <div>
                    <div class="ft-kpi-value">{current_weight:.1f}<span class="ft-kpi-suffix"> kg</span></div>
                    <div class="ft-delta">{delta_from_first:+.1f} kg desde el primer registro</div>
                </div>
                <div class="ft-note" style="text-align:right; padding-top:0.42rem;">
                    máx {max_weight:.1f} kg<br>mín {min_weight:.1f} kg
                </div>
            </div>
        </div>
        """
    )
    figure = plot_body_weight(entries_df)
    if figure:
        st.plotly_chart(figure, use_container_width=True, config={"displayModeBar": False, "responsive": True})

render_section_label("Historial")
history_df = entries_df.sort_values("entry_date", ascending=False).reset_index(drop=True)
for index, row in history_df.iterrows():
    next_weight = float(history_df.iloc[index + 1]["weight"]) if index + 1 < len(history_df) else None
    delta = float(row["weight"]) - next_weight if next_weight is not None else None
    notes_html = f'<div class="ft-note" style="margin-top:0.15rem;">{row["notes"]}</div>' if row.get("notes") else ""
    delta_html = f'<div class="ft-note" style="color:#3DA37A; font-weight:800;">{delta:+.1f}</div>' if delta is not None else '<div class="ft-note">inicio</div>'
    render_html(
        f"""
        <div class="ft-row-card">
            <div class="ft-row-top">
                <div style="display:flex; align-items:center; gap:0.8rem; flex:1; min-width:0;">
                    <div style="width:46px; height:46px; border-radius:14px; background:#3A82C418; color:#3A82C4; display:flex; align-items:center; justify-content:center; flex-shrink:0;">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
                            <circle cx="12" cy="5" r="2"></circle>
                            <path d="M12 7v5"></path>
                            <path d="M12 12l-4 3"></path>
                            <path d="M12 12l4 3"></path>
                            <path d="M12 12l-1 7"></path>
                            <path d="M12 12l1 7"></path>
                        </svg>
                    </div>
                    <div class="ft-row-main">
                        <div class="ft-row-title">{format_date(row["entry_date"])}</div>
                        {notes_html}
                    </div>
                </div>
                <div class="ft-row-side">
                    <div class="ft-row-side-strong">{float(row["weight"]):.1f} kg</div>
                    {delta_html}
                </div>
            </div>
        </div>
        """
    )
