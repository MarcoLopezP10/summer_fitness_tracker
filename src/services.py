from __future__ import annotations

from datetime import timedelta
from typing import Any

import pandas as pd
import streamlit as st

from src.supabase_client import get_supabase_client
from src.utils import calculate_volume


def _clear_cached_reads() -> None:
    st.cache_data.clear()


@st.cache_data(show_spinner=False, ttl=30)
def _get_workout_aggregate_map(workout_ids: tuple[str, ...]) -> dict[str, dict[str, Any]]:
    if not workout_ids:
        return {}

    workout_exercises_response = (
        get_supabase_client()
        .table("workout_exercises")
        .select(
            "id, workout_id, exercise_id, training_type_id, exercise_order, notes, exercises(id, name), training_types(name)"
        )
        .in_("workout_id", list(workout_ids))
        .order("exercise_order")
        .execute()
    )
    workout_exercises = workout_exercises_response.data or []
    workout_exercise_ids = [item["id"] for item in workout_exercises]

    sets_by_workout_exercise: dict[str, list[dict[str, Any]]] = {item_id: [] for item_id in workout_exercise_ids}
    if workout_exercise_ids:
        sets_response = (
            get_supabase_client()
            .table("sets")
            .select("*")
            .in_("workout_exercise_id", workout_exercise_ids)
            .order("set_number")
            .execute()
        )
        for row in sets_response.data or []:
            row["volume"] = calculate_volume(row.get("weight"), row.get("reps"))
            sets_by_workout_exercise.setdefault(row["workout_exercise_id"], []).append(row)

    aggregates: dict[str, dict[str, Any]] = {
        workout_id: {
            "workout_exercises": [],
            "total_volume": 0.0,
            "total_sets": 0,
            "exercise_count": 0,
        }
        for workout_id in workout_ids
    }

    for workout_exercise in workout_exercises:
        sets = sets_by_workout_exercise.get(workout_exercise["id"], [])
        workout_exercise["exercise_name"] = (workout_exercise.get("exercises") or {}).get("name", "Ejercicio")
        workout_exercise["training_type_name"] = (workout_exercise.get("training_types") or {}).get("name", "Sin especificar")
        workout_exercise["sets"] = sets
        workout_exercise["total_volume"] = sum(item["volume"] for item in sets if item.get("volume") is not None)
        workout_exercise["set_count"] = len(sets)
        workout_exercise["max_weight"] = max(
            (float(item["weight"]) for item in sets if item.get("weight") is not None),
            default=None,
        )

        aggregate = aggregates.setdefault(
            workout_exercise["workout_id"],
            {"workout_exercises": [], "total_volume": 0.0, "total_sets": 0, "exercise_count": 0},
        )
        aggregate["workout_exercises"].append(workout_exercise)
        aggregate["total_volume"] += float(workout_exercise.get("total_volume") or 0)
        aggregate["total_sets"] += int(workout_exercise.get("set_count") or 0)

    for aggregate in aggregates.values():
        aggregate["exercise_count"] = len(aggregate["workout_exercises"])

    return aggregates


@st.cache_data(show_spinner=False, ttl=30)
def get_training_types() -> list[dict]:
    response = (
        get_supabase_client()
        .table("training_types")
        .select("*")
        .order("name")
        .execute()
    )
    return response.data or []


def create_exercise(name: str, default_training_type_id: str | None = None, notes: str | None = None) -> dict:
    payload = {
        "name": name.strip(),
        "default_training_type_id": default_training_type_id,
        "notes": notes or None,
    }
    response = get_supabase_client().table("exercises").insert(payload).execute()
    _clear_cached_reads()
    return (response.data or [None])[0]


@st.cache_data(show_spinner=False, ttl=30)
def get_exercises(default_training_type_id: str | None = None) -> list[dict]:
    query = (
        get_supabase_client()
        .table("exercises")
        .select("id, name, notes, created_at, default_training_type_id, training_types(name)")
        .order("name")
    )
    if default_training_type_id == "__none__":
        query = query.is_("default_training_type_id", None)
    elif default_training_type_id:
        query = query.eq("default_training_type_id", default_training_type_id)

    response = query.execute()
    rows = response.data or []
    for row in rows:
        row["default_training_type_name"] = (row.get("training_types") or {}).get("name", "Sin tipo por defecto")
    return rows


def create_workout(workout_date: str, name: str, notes: str | None = None) -> dict:
    payload = {
        "workout_date": workout_date,
        "name": name.strip(),
        "notes": notes or None,
    }
    response = get_supabase_client().table("workouts").insert(payload).execute()
    _clear_cached_reads()
    return (response.data or [None])[0]


def update_workout(workout_id: str, name: str, workout_date: str, notes: str | None = None) -> dict:
    payload = {
        "name": name.strip(),
        "workout_date": workout_date,
        "notes": notes or None,
    }
    response = (
        get_supabase_client()
        .table("workouts")
        .update(payload)
        .eq("id", workout_id)
        .execute()
    )
    _clear_cached_reads()
    return (response.data or [None])[0]


@st.cache_data(show_spinner=False, ttl=30)
def get_workouts(limit: int | None = None) -> list[dict]:
    query = (
        get_supabase_client()
        .table("workouts")
        .select("*")
        .order("workout_date", desc=True)
        .order("created_at", desc=True)
    )
    if limit:
        query = query.limit(limit)

    response = query.execute()
    return response.data or []


def get_recent_workouts(limit: int = 5) -> list[dict]:
    return get_workouts(limit=limit)


def add_exercise_to_workout(
    workout_id: str,
    exercise_id: str,
    training_type_id: str | None = None,
    exercise_order: int | None = None,
    notes: str | None = None,
) -> dict:
    payload = {
        "workout_id": workout_id,
        "exercise_id": exercise_id,
        "training_type_id": training_type_id,
        "exercise_order": exercise_order,
        "notes": notes or None,
    }
    response = get_supabase_client().table("workout_exercises").insert(payload).execute()
    _clear_cached_reads()
    return (response.data or [None])[0]


def add_set(
    workout_exercise_id: str,
    set_number: int,
    weight: float | None = None,
    reps: int | None = None,
    duration_seconds: int | None = None,
    distance_meters: float | None = None,
    height_cm: float | None = None,
    intensity_notes: str | None = None,
    notes: str | None = None,
) -> dict:
    payload = {
        "workout_exercise_id": workout_exercise_id,
        "set_number": set_number,
        "weight": weight,
        "reps": reps,
        "duration_seconds": duration_seconds,
        "distance_meters": distance_meters,
        "height_cm": height_cm,
        "intensity_notes": intensity_notes or None,
        "notes": notes or None,
    }
    response = get_supabase_client().table("sets").insert(payload).execute()
    _clear_cached_reads()
    return (response.data or [None])[0]


def update_workout_exercise(
    workout_exercise_id: str,
    training_type_id: str | None = None,
    notes: str | None = None,
) -> dict:
    payload = {
        "training_type_id": training_type_id,
        "notes": notes or None,
    }
    response = (
        get_supabase_client()
        .table("workout_exercises")
        .update(payload)
        .eq("id", workout_exercise_id)
        .execute()
    )
    _clear_cached_reads()
    return (response.data or [None])[0]


def update_set(
    set_id: str,
    weight: float | None = None,
    reps: int | None = None,
    set_number: int | None = None,
) -> dict:
    payload = {
        "weight": weight,
        "reps": reps,
    }
    if set_number is not None:
        payload["set_number"] = set_number

    response = (
        get_supabase_client()
        .table("sets")
        .update(payload)
        .eq("id", set_id)
        .execute()
    )
    _clear_cached_reads()
    return (response.data or [None])[0]


def _resequence_sets(workout_exercise_id: str) -> None:
    response = (
        get_supabase_client()
        .table("sets")
        .select("id")
        .eq("workout_exercise_id", workout_exercise_id)
        .order("set_number")
        .execute()
    )
    sets = response.data or []
    for index, set_row in enumerate(sets, start=1):
        get_supabase_client().table("sets").update({"set_number": index}).eq("id", set_row["id"]).execute()


def _resequence_workout_exercises(workout_id: str) -> None:
    response = (
        get_supabase_client()
        .table("workout_exercises")
        .select("id")
        .eq("workout_id", workout_id)
        .order("exercise_order")
        .execute()
    )
    exercises = response.data or []
    for index, exercise_row in enumerate(exercises, start=1):
        get_supabase_client().table("workout_exercises").update({"exercise_order": index}).eq("id", exercise_row["id"]).execute()


def delete_set(set_id: str, workout_exercise_id: str) -> None:
    get_supabase_client().table("sets").delete().eq("id", set_id).execute()
    _resequence_sets(workout_exercise_id)
    _clear_cached_reads()


def delete_workout_exercise(workout_exercise_id: str, workout_id: str) -> None:
    get_supabase_client().table("workout_exercises").delete().eq("id", workout_exercise_id).execute()
    _resequence_workout_exercises(workout_id)
    _clear_cached_reads()


def duplicate_workout_exercise(workout_exercise_id: str, target_workout_id: str) -> dict:
    source_response = (
        get_supabase_client()
        .table("workout_exercises")
        .select("*")
        .eq("id", workout_exercise_id)
        .limit(1)
        .execute()
    )
    source = (source_response.data or [None])[0]
    if not source:
        raise ValueError("No se encontro el ejercicio a duplicar.")

    existing_response = (
        get_supabase_client()
        .table("workout_exercises")
        .select("exercise_order")
        .eq("workout_id", target_workout_id)
        .order("exercise_order", desc=True)
        .limit(1)
        .execute()
    )
    last_row = (existing_response.data or [None])[0]
    next_order = (last_row or {}).get("exercise_order", 0) + 1

    duplicated = add_exercise_to_workout(
        workout_id=target_workout_id,
        exercise_id=source["exercise_id"],
        training_type_id=source.get("training_type_id"),
        exercise_order=next_order,
        notes=source.get("notes"),
    )

    sets_response = (
        get_supabase_client()
        .table("sets")
        .select("*")
        .eq("workout_exercise_id", workout_exercise_id)
        .order("set_number")
        .execute()
    )
    for set_row in sets_response.data or []:
        add_set(
            workout_exercise_id=duplicated["id"],
            set_number=set_row["set_number"],
            weight=set_row.get("weight"),
            reps=set_row.get("reps"),
            duration_seconds=set_row.get("duration_seconds"),
            distance_meters=set_row.get("distance_meters"),
            height_cm=set_row.get("height_cm"),
            intensity_notes=set_row.get("intensity_notes"),
            notes=set_row.get("notes"),
        )

    _clear_cached_reads()
    return duplicated


def copy_workout_into_workout(source_workout_id: str, target_workout_id: str) -> None:
    source_detail = get_workout_detail(source_workout_id)
    if not source_detail:
        raise ValueError("No se encontro el entrenamiento origen.")

    existing_response = (
        get_supabase_client()
        .table("workout_exercises")
        .select("exercise_order")
        .eq("workout_id", target_workout_id)
        .order("exercise_order", desc=True)
        .limit(1)
        .execute()
    )
    last_row = (existing_response.data or [None])[0]
    next_order = (last_row or {}).get("exercise_order", 0) + 1

    for item in source_detail.get("workout_exercises", []):
        duplicated = add_exercise_to_workout(
            workout_id=target_workout_id,
            exercise_id=(item.get("exercises") or {}).get("id") if item.get("exercises") else None,
            training_type_id=item.get("training_type_id"),
            exercise_order=next_order,
            notes=item.get("notes"),
        )
        next_order += 1
        for set_row in item.get("sets", []):
            add_set(
                workout_exercise_id=duplicated["id"],
                set_number=set_row["set_number"],
                weight=set_row.get("weight"),
                reps=set_row.get("reps"),
                duration_seconds=set_row.get("duration_seconds"),
                distance_meters=set_row.get("distance_meters"),
                height_cm=set_row.get("height_cm"),
                intensity_notes=set_row.get("intensity_notes"),
                notes=set_row.get("notes"),
            )
    _clear_cached_reads()


def move_workout_exercise(workout_id: str, workout_exercise_id: str, direction: str) -> None:
    response = (
        get_supabase_client()
        .table("workout_exercises")
        .select("id, exercise_order")
        .eq("workout_id", workout_id)
        .order("exercise_order")
        .execute()
    )
    rows = response.data or []
    index = next((idx for idx, row in enumerate(rows) if row["id"] == workout_exercise_id), None)
    if index is None:
        raise ValueError("No se encontro el ejercicio dentro del entrenamiento.")

    swap_index = index - 1 if direction == "up" else index + 1
    if swap_index < 0 or swap_index >= len(rows):
        return

    current = rows[index]
    target = rows[swap_index]

    get_supabase_client().table("workout_exercises").update({"exercise_order": -1}).eq("id", current["id"]).execute()
    get_supabase_client().table("workout_exercises").update({"exercise_order": current["exercise_order"]}).eq("id", target["id"]).execute()
    get_supabase_client().table("workout_exercises").update({"exercise_order": target["exercise_order"]}).eq("id", current["id"]).execute()
    _resequence_workout_exercises(workout_id)
    _clear_cached_reads()


@st.cache_data(show_spinner=False, ttl=30)
def get_workout_detail(workout_id: str) -> dict[str, Any]:
    workout_response = (
        get_supabase_client()
        .table("workouts")
        .select("*")
        .eq("id", workout_id)
        .limit(1)
        .execute()
    )
    workout = (workout_response.data or [None])[0]
    if not workout:
        return {}

    aggregate = _get_workout_aggregate_map((workout_id,)).get(workout_id, {})
    workout["workout_exercises"] = aggregate.get("workout_exercises", [])
    workout["total_volume"] = aggregate.get("total_volume", 0.0)
    workout["total_sets"] = aggregate.get("total_sets", 0)
    workout["exercise_count"] = aggregate.get("exercise_count", 0)
    return workout


@st.cache_data(show_spinner=False, ttl=30)
def get_exercise_progress(exercise_id: str) -> list[dict]:
    response = (
        get_supabase_client()
        .table("workout_exercises")
        .select(
            "id, workout_id, workouts(workout_date, name), training_types(name)"
        )
        .eq("exercise_id", exercise_id)
        .order("created_at")
        .execute()
    )
    workout_exercises = response.data or []

    workout_exercise_ids = [item["id"] for item in workout_exercises]
    sets_by_workout_exercise: dict[str, list[dict[str, Any]]] = {item_id: [] for item_id in workout_exercise_ids}
    if workout_exercise_ids:
        sets_response = (
            get_supabase_client()
            .table("sets")
            .select("*")
            .in_("workout_exercise_id", workout_exercise_ids)
            .order("set_number")
            .execute()
        )
        for row in sets_response.data or []:
            sets_by_workout_exercise.setdefault(row["workout_exercise_id"], []).append(row)

    rows = []
    for workout_exercise in workout_exercises:
        sets = sets_by_workout_exercise.get(workout_exercise["id"], [])
        weights = [float(item["weight"]) for item in sets if item.get("weight") is not None]
        volumes = [calculate_volume(item.get("weight"), item.get("reps")) for item in sets]
        reps = [int(item["reps"]) for item in sets if item.get("reps") is not None]
        durations = [int(item["duration_seconds"]) for item in sets if item.get("duration_seconds") is not None]
        distances = [float(item["distance_meters"]) for item in sets if item.get("distance_meters") is not None]
        heights = [float(item["height_cm"]) for item in sets if item.get("height_cm") is not None]

        rows.append(
            {
                "workout_date": (workout_exercise.get("workouts") or {}).get("workout_date"),
                "workout_name": (workout_exercise.get("workouts") or {}).get("name"),
                "training_type_name": (workout_exercise.get("training_types") or {}).get("name", "Sin especificar"),
                "max_weight": max(weights) if weights else None,
                "total_volume": sum(value for value in volumes if value is not None) if any(value is not None for value in volumes) else None,
                "total_reps": sum(reps) if reps else None,
                "total_duration": sum(durations) if durations else None,
                "total_distance": sum(distances) if distances else None,
                "max_height": max(heights) if heights else None,
                "set_count": len(sets),
            }
        )

    df = pd.DataFrame(rows)
    if df.empty:
        return []

    grouped = (
        df.groupby(["workout_date", "workout_name", "training_type_name"], dropna=False, as_index=False)
        .agg(
            max_weight=("max_weight", "max"),
            total_volume=("total_volume", "sum"),
            total_reps=("total_reps", "sum"),
            total_duration=("total_duration", "sum"),
            total_distance=("total_distance", "sum"),
            max_height=("max_height", "max"),
            set_count=("set_count", "sum"),
        )
        .sort_values("workout_date")
    )
    grouped = grouped.where(pd.notnull(grouped), None)
    return grouped.to_dict(orient="records")


@st.cache_data(show_spinner=False, ttl=30)
def get_recent_workout_summaries(limit: int = 6) -> list[dict]:
    workouts = get_workouts(limit=limit)
    aggregate_map = _get_workout_aggregate_map(tuple(workout["id"] for workout in workouts))
    summaries = []
    for workout in workouts:
        detail = aggregate_map.get(workout["id"], {})
        summaries.append(
            {
                "id": workout["id"],
                "name": workout["name"],
                "workout_date": workout["workout_date"],
                "notes": workout.get("notes"),
                "exercise_count": detail.get("exercise_count", 0),
                "total_sets": detail.get("total_sets", 0),
                "total_volume": detail.get("total_volume", 0),
            }
        )
    return summaries


@st.cache_data(show_spinner=False, ttl=30)
def get_workout_history_summary() -> list[dict]:
    workouts = get_workouts()
    aggregate_map = _get_workout_aggregate_map(tuple(workout["id"] for workout in workouts))
    rows = []
    for workout in workouts:
        detail = aggregate_map.get(workout["id"], {})
        rows.append(
            {
                "id": workout["id"],
                "workout_date": workout["workout_date"],
                "name": workout["name"],
                "notes": workout.get("notes"),
                "exercise_count": detail.get("exercise_count", 0),
                "total_sets": detail.get("total_sets", 0),
                "total_volume": detail.get("total_volume", 0),
                "exercise_names": ", ".join(item.get("exercise_name", "") for item in detail.get("workout_exercises", [])),
                "training_types": ", ".join(sorted({item.get("training_type_name", "Sin especificar") for item in detail.get("workout_exercises", [])})),
            }
        )
    return rows


@st.cache_data(show_spinner=False, ttl=30)
def get_exercise_progress_insights(exercise_id: str) -> dict[str, Any]:
    rows = get_exercise_progress(exercise_id)
    df = pd.DataFrame(rows)
    if df.empty:
        return {}

    df["workout_date"] = pd.to_datetime(df["workout_date"])
    df = df.sort_values("workout_date")
    latest = df.iloc[-1].to_dict()
    previous = df.iloc[-2].to_dict() if len(df) > 1 else None

    def _delta(field: str):
        if previous is None:
            return None
        current_value = latest.get(field)
        previous_value = previous.get(field)
        if pd.isna(current_value) or pd.isna(previous_value):
            return None
        return float(current_value) - float(previous_value)

    best_weight = pd.to_numeric(df.get("max_weight"), errors="coerce").max() if "max_weight" in df.columns else None
    best_volume = pd.to_numeric(df.get("total_volume"), errors="coerce").max() if "total_volume" in df.columns else None
    best_height = pd.to_numeric(df.get("max_height"), errors="coerce").max() if "max_height" in df.columns else None
    total_sessions = len(df)

    return {
        "latest": latest,
        "previous": previous,
        "delta_weight": _delta("max_weight"),
        "delta_volume": _delta("total_volume"),
        "delta_reps": _delta("total_reps"),
        "delta_duration": _delta("total_duration"),
        "delta_height": _delta("max_height"),
        "best_weight": None if pd.isna(best_weight) else float(best_weight),
        "best_volume": None if pd.isna(best_volume) else float(best_volume),
        "best_height": None if pd.isna(best_height) else float(best_height),
        "total_sessions": total_sessions,
    }


def add_body_weight(entry_date: str, weight: float, notes: str | None = None) -> dict:
    payload = {
        "entry_date": entry_date,
        "weight": weight,
        "notes": notes or None,
    }
    response = get_supabase_client().table("body_weight").upsert(payload, on_conflict="entry_date").execute()
    _clear_cached_reads()
    return (response.data or [None])[0]


@st.cache_data(show_spinner=False, ttl=30)
def get_body_weight_entries() -> list[dict]:
    response = (
        get_supabase_client()
        .table("body_weight")
        .select("*")
        .order("entry_date", desc=True)
        .execute()
    )
    return response.data or []


@st.cache_data(show_spinner=False, ttl=30)
def get_dashboard_summary() -> dict[str, Any]:
    workouts = get_workouts()
    exercises = get_exercises()
    body_weight_entries = get_body_weight_entries()
    recent_summaries = get_recent_workout_summaries(limit=4)
    aggregate_map = _get_workout_aggregate_map(tuple(workout["id"] for workout in workouts))

    total_volume_recent = sum(float((aggregate_map.get(workout["id"], {}) or {}).get("total_volume", 0) or 0) for workout in workouts[:5])

    workouts_df = pd.DataFrame(workouts)
    workouts_this_week = 0
    volume_this_week = 0.0
    if not workouts_df.empty:
        workouts_df["workout_date"] = pd.to_datetime(workouts_df["workout_date"])
        latest_date = workouts_df["workout_date"].max().normalize()
        week_start = latest_date - timedelta(days=6)
        recent_week_ids = workouts_df.loc[workouts_df["workout_date"] >= week_start, "id"].tolist()
        workouts_this_week = len(recent_week_ids)
        for workout_id in recent_week_ids:
            volume_this_week += float((aggregate_map.get(workout_id, {}) or {}).get("total_volume", 0) or 0)

    return {
        "total_workouts": len(workouts),
        "total_exercises": len(exercises),
        "last_workout": workouts[0] if workouts else None,
        "last_body_weight": body_weight_entries[0] if body_weight_entries else None,
        "recent_total_volume": total_volume_recent if total_volume_recent else None,
        "recent_workouts": recent_summaries,
        "workouts_this_week": workouts_this_week,
        "volume_this_week": volume_this_week,
    }
