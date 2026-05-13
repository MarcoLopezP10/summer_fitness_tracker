create extension if not exists "pgcrypto";

create table if not exists training_types (
    id uuid primary key default gen_random_uuid(),
    name text not null unique,
    description text,
    created_at timestamp with time zone default now()
);

create table if not exists exercises (
    id uuid primary key default gen_random_uuid(),
    name text not null unique,
    default_training_type_id uuid references training_types(id) on delete set null,
    notes text,
    created_at timestamp with time zone default now()
);

create table if not exists workouts (
    id uuid primary key default gen_random_uuid(),
    workout_date date not null,
    name text not null,
    notes text,
    created_at timestamp with time zone default now()
);

create table if not exists workout_exercises (
    id uuid primary key default gen_random_uuid(),
    workout_id uuid not null references workouts(id) on delete cascade,
    exercise_id uuid not null references exercises(id) on delete cascade,
    training_type_id uuid references training_types(id) on delete set null,
    exercise_order integer,
    notes text,
    created_at timestamp with time zone default now()
);

create table if not exists sets (
    id uuid primary key default gen_random_uuid(),
    workout_exercise_id uuid not null references workout_exercises(id) on delete cascade,
    set_number integer not null,
    weight numeric(6,2),
    reps integer,
    duration_seconds integer,
    distance_meters numeric(6,2),
    height_cm numeric(6,2),
    intensity_notes text,
    notes text,
    created_at timestamp with time zone default now()
);

create table if not exists body_weight (
    id uuid primary key default gen_random_uuid(),
    entry_date date not null unique,
    weight numeric(5,2) not null,
    notes text,
    created_at timestamp with time zone default now()
);
