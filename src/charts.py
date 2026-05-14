from __future__ import annotations

import pandas as pd
import plotly.express as px


def _base_line_chart(df: pd.DataFrame, y: str, title: str, y_label: str, color: str):
    chart_df = df.dropna(subset=[y]).copy()
    if chart_df.empty:
        return None

    chart_df["workout_date"] = pd.to_datetime(chart_df["workout_date"])
    chart_df = chart_df.sort_values(["workout_date", "workout_name"], kind="stable").reset_index(drop=True)
    chart_df["base_label"] = chart_df["workout_date"].dt.strftime("%d/%m/%Y")
    if "workout_name" in chart_df.columns:
        name_counts = chart_df.groupby(["base_label", "workout_name"]).cumcount()
        chart_df["session_label"] = chart_df["base_label"] + " · " + chart_df["workout_name"].fillna("Sesión")
        chart_df.loc[name_counts > 0, "session_label"] = (
            chart_df.loc[name_counts > 0, "session_label"] + " #" + (name_counts[name_counts > 0] + 1).astype(str)
        )
    else:
        duplicate_counts = chart_df.groupby("base_label").cumcount()
        chart_df["session_label"] = chart_df["base_label"]
        chart_df.loc[duplicate_counts > 0, "session_label"] = (
            chart_df.loc[duplicate_counts > 0, "base_label"] + " #" + (duplicate_counts[duplicate_counts > 0] + 1).astype(str)
        )
    chart_df["session_label"] = pd.Categorical(
        chart_df["session_label"],
        categories=chart_df["session_label"].tolist(),
        ordered=True,
    )

    if len(chart_df) == 1:
        fig = px.scatter(
            chart_df,
            x="session_label",
            y=y,
            title=title,
            labels={"session_label": "Sesión", y: y_label},
        )
    else:
        fig = px.line(
            chart_df,
            x="session_label",
            y=y,
            markers=True,
            title=title,
            labels={"session_label": "Sesión", y: y_label},
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
        paper_bgcolor="rgba(0,0,0,0)",
        title="",
        title_font=dict(size=18),
        hovermode="x unified",
        xaxis_title="",
        yaxis_title="",
        font=dict(color="#1F1B16"),
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
        line=dict(color="#3A82C4", width=3),
        marker=dict(size=9, color="#3A82C4", line=dict(width=2, color="#ffffff")),
        hovertemplate="%{x}<br>%{y} kg<extra></extra>",
    )
    fig.update_layout(
        margin=dict(l=12, r=12, t=24, b=12),
        height=260,
        plot_bgcolor="#ffffff",
        paper_bgcolor="rgba(0,0,0,0)",
        title="",
        title_font=dict(size=18),
        hovermode="x unified",
        xaxis_title="",
        yaxis_title="",
        font=dict(color="#1F1B16"),
    )
    fig.update_xaxes(showgrid=False)
    fig.update_yaxes(gridcolor="rgba(31,27,22,0.08)")
    return fig
