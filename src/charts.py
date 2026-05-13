from __future__ import annotations

import pandas as pd
import plotly.express as px


def _base_line_chart(df: pd.DataFrame, y: str, title: str, y_label: str, color: str):
    chart_df = df.dropna(subset=[y]).copy()
    if chart_df.empty:
        return None

    chart_df["workout_date"] = pd.to_datetime(chart_df["workout_date"])
    chart_df["date_label"] = chart_df["workout_date"].dt.strftime("%d/%m/%Y")
    chart_df["date_label"] = pd.Categorical(chart_df["date_label"], categories=chart_df["date_label"].tolist(), ordered=True)

    if len(chart_df) == 1:
        fig = px.scatter(
            chart_df,
            x="date_label",
            y=y,
            title=title,
            labels={"date_label": "Fecha", y: y_label},
        )
    else:
        fig = px.line(
            chart_df,
            x="date_label",
            y=y,
            markers=True,
            title=title,
            labels={"date_label": "Fecha", y: y_label},
        )
    fig.update_traces(
        line=dict(color=color, width=3),
        marker=dict(size=9, color=color, line=dict(width=2, color="#ffffff")),
        hovertemplate="%{x}<br>%{y}<extra></extra>",
    )
    fig.update_layout(
        margin=dict(l=12, r=12, t=24, b=12),
        height=260,
        plot_bgcolor="#ffffff",
        paper_bgcolor="#ffffff",
        title="",
        title_font=dict(size=18),
        hovermode="x unified",
        xaxis_title="",
        yaxis_title="",
    )
    fig.update_xaxes(showgrid=False)
    fig.update_yaxes(gridcolor="rgba(31,27,22,0.08)")
    return fig


def plot_exercise_max_weight(df: pd.DataFrame):
    return _base_line_chart(df, "max_weight", "Evolucion del peso maximo", "Peso maximo", "#D94B4B")


def plot_exercise_volume(df: pd.DataFrame):
    return _base_line_chart(df, "total_volume", "Evolucion del volumen total", "Volumen total", "#7B5CD6")


def plot_exercise_reps(df: pd.DataFrame):
    return _base_line_chart(df, "total_reps", "Evolucion de las repeticiones", "Repeticiones totales", "#E68A2E")


def plot_exercise_duration(df: pd.DataFrame):
    return _base_line_chart(df, "total_duration", "Evolucion de la duracion", "Duracion total", "#E68A2E")


def plot_exercise_distance(df: pd.DataFrame):
    return _base_line_chart(df, "total_distance", "Evolucion de la distancia", "Distancia total", "#3A82C4")


def plot_body_weight(df: pd.DataFrame):
    chart_df = df.copy()
    if chart_df.empty:
        return None

    chart_df["entry_date"] = pd.to_datetime(chart_df["entry_date"])
    chart_df["date_label"] = chart_df["entry_date"].dt.strftime("%d/%m/%Y")
    chart_df["date_label"] = pd.Categorical(chart_df["date_label"], categories=chart_df["date_label"].tolist(), ordered=True)
    if len(chart_df) == 1:
        fig = px.scatter(
            chart_df,
            x="date_label",
            y="weight",
            title="Evolucion del peso corporal",
            labels={"date_label": "Fecha", "weight": "Peso corporal"},
        )
    else:
        fig = px.line(
            chart_df,
            x="date_label",
            y="weight",
            markers=True,
            title="Evolucion del peso corporal",
            labels={"date_label": "Fecha", "weight": "Peso corporal"},
        )
    fig.update_traces(
        line=dict(color="#7c3aed", width=3),
        marker=dict(size=9, color="#7c3aed", line=dict(width=2, color="#ffffff")),
        hovertemplate="%{x}<br>%{y} kg<extra></extra>",
    )
    fig.update_layout(
        margin=dict(l=12, r=12, t=24, b=12),
        height=260,
        plot_bgcolor="#ffffff",
        paper_bgcolor="#ffffff",
        title="",
        title_font=dict(size=18),
        hovermode="x unified",
        xaxis_title="",
        yaxis_title="",
    )
    fig.update_xaxes(showgrid=False)
    fig.update_yaxes(gridcolor="rgba(31,27,22,0.08)")
    return fig
