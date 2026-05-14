from __future__ import annotations

from datetime import date, datetime

import pandas as pd


def calculate_volume(weight, reps):
    if weight is None or reps is None:
        return None

    try:
        return float(weight) * int(reps)
    except (TypeError, ValueError):
        return None


def safe_float(value):
    if value in (None, ""):
        return None

    try:
        return float(value)
    except (TypeError, ValueError):
        return None


def safe_int(value):
    if value in (None, ""):
        return None

    try:
        return int(value)
    except (TypeError, ValueError):
        return None


def format_date(value):
    if value in (None, ""):
        return "-"

    try:
        parsed = pd.to_datetime(value).date()
    except Exception:
        return str(value)

    today = date.today()
    delta_days = (today - parsed).days

    if delta_days == 0:
        return "hoy"
    if delta_days == 1:
        return "ayer"
    if 1 < delta_days <= 6:
        return f"hace {delta_days} días"

    months = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"]
    return f"{parsed.day} {months[parsed.month - 1]}"


def validate_set_data(set_data: dict) -> tuple[bool, str]:
    if set_data.get("weight") is None and set_data.get("reps") is None:
        return False, "Cada serie debe incluir peso, repeticiones o ambas."

    if set_data.get("set_number") is None:
        return False, "El numero de serie es obligatorio."

    if set_data.get("weight") is not None and set_data["weight"] < 0:
        return False, "El peso no puede ser negativo."

    if set_data.get("reps") is not None and set_data["reps"] < 0:
        return False, "Las repeticiones no pueden ser negativas."

    return True, ""


def build_progress_dataframe(progress_rows: list[dict]) -> pd.DataFrame:
    df = pd.DataFrame(progress_rows or [])
    if df.empty:
        return df

    if "workout_date" in df.columns:
        df["workout_date"] = pd.to_datetime(df["workout_date"])
        df = df.sort_values("workout_date")

    numeric_columns = [
        "max_weight",
        "total_volume",
        "total_reps",
        "total_duration",
        "total_distance",
        "max_height",
        "set_count",
    ]

    for column in numeric_columns:
        if column in df.columns:
            df[column] = pd.to_numeric(df[column], errors="coerce")

    return df


def build_unique_name_map(rows: list[dict], *, name_key: str = "name", id_key: str = "id") -> tuple[dict[str, str], dict[str, dict]]:
    seen: dict[str, int] = {}
    option_map: dict[str, str] = {}
    row_map: dict[str, dict] = {}

    for row in rows:
        base_name = str(row.get(name_key) or "Sin nombre").strip()
        seen[base_name] = seen.get(base_name, 0) + 1
        label = base_name if seen[base_name] == 1 else f"{base_name} ({seen[base_name]})"
        option_map[label] = row[id_key]
        row_map[label] = row

    return option_map, row_map
