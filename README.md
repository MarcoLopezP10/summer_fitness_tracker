# Summer Fitness Tracker

Aplicacion personal de seguimiento de entrenamientos construida con Python, Streamlit, Supabase PostgreSQL, Pandas y Plotly.

## Caracteristicas principales

- Registro de ejercicios con tipo de entrenamiento por defecto opcional.
- Creacion de entrenamientos con ejercicios y series.
- Soporte para distintos tipos de medicion por serie:
  - peso
  - repeticiones
  - duracion
  - distancia
  - altura
- Historial detallado de entrenamientos.
- Progresion por ejercicio con tablas y graficas.
- Registro y seguimiento de peso corporal.

## Requisitos

- Python 3.10 o superior
- Proyecto de Supabase activo

## 1. Crear entorno virtual

```bash
python3 -m venv .venv
source .venv/bin/activate
```

## 2. Instalar dependencias

```bash
pip install -r requirements.txt
```

## 3. Crear proyecto en Supabase

1. Crea un proyecto nuevo en Supabase.
2. Abre el editor SQL.
3. Ejecuta primero el archivo `sql/001_create_tables.sql`.
4. Ejecuta despues el archivo `sql/002_seed_training_types.sql`.
5. Ejecuta despues `sql/003_seed_demo_exercises.sql` si quieres cargar ejercicios de ejemplo.
6. Si quieres usar edicion y borrado desde la app, ejecuta tambien `sql/004_enable_update_delete_policies.sql`.
7. Si quieres activar login real con Supabase Auth y cerrar el acceso publico, ejecuta tambien `sql/005_require_authenticated_policies.sql`.

## 4. Configurar secrets de Streamlit

1. Copia el archivo de ejemplo:

```bash
cp .streamlit/secrets.toml.example .streamlit/secrets.toml
```

2. Rellena los valores reales de Supabase:

```toml
SUPABASE_URL="https://TU-PROYECTO.supabase.co"
SUPABASE_KEY="TU_SUPABASE_KEY"
```

Tambien se incluyen claves `NEXT_PUBLIC_SUPABASE_URL` y `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` en el ejemplo para mantener compatibilidad con otros entornos, pero la aplicacion usa `SUPABASE_URL` y `SUPABASE_KEY`.

## 5. Crear tu usuario en Supabase Auth

1. Ve a `Authentication > Users` en Supabase.
2. Crea un usuario con tu email y contraseña.
3. Si has ejecutado `sql/005_require_authenticated_policies.sql`, la app pedira login con ese usuario y solo usuarios autenticados podran acceder a los datos.

## 6. Ejecutar la app

```bash
streamlit run app.py
```

## Estructura del proyecto

```text
summer_fitness_tracker/
├── app.py
├── requirements.txt
├── README.md
├── .gitignore
├── .streamlit/
│   └── secrets.toml.example
├── sql/
│   ├── 001_create_tables.sql
│   └── 002_seed_training_types.sql
│   ├── 003_seed_demo_exercises.sql
│   ├── 004_enable_update_delete_policies.sql
│   └── 005_require_authenticated_policies.sql
├── src/
│   ├── __init__.py
│   ├── supabase_client.py
│   ├── services.py
│   ├── charts.py
│   └── utils.py
└── pages/
    ├── 1_Nuevo_entrenamiento.py
    ├── 2_Historial.py
    ├── 3_Ejercicios.py
    ├── 4_Progresion.py
    ├── 5_Peso_corporal.py
    └── 6_Configuracion.py
```
