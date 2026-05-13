# Handoff a Codex — fitness_tracker

## Pasos exactos

### 1. Abre el prototipo y haz capturas
Abre `Fitness Tracker.html` en tu navegador. Toma capturas de cada pantalla clave:
- **Resumen** (Inicio)
- **Nuevo entrenamiento** (vacío y con un ejercicio + series añadidas)
- **Historial** (lista) y detalle de un entrenamiento
- **Ejercicios** (lista y formulario de crear)
- **Progresión** (con gráficas) y el sheet de elegir ejercicio
- **Peso corporal** (con gráfica)
- **Configuración**

Guarda las capturas en una carpeta `references/` dentro del proyecto.

### 2. Crea un proyecto vacío y pega este prompt en Codex

Abre Codex con un proyecto/carpeta vacía y mándale **este prompt completo** junto con las capturas y la spec original adjuntas:

> Voy a darte el spec funcional + capturas de un prototipo visual. Implementa una app **Python + Streamlit + Supabase** siguiendo **literalmente** la estructura de archivos del spec y **visualmente** las capturas.
>
> **Importante:**
> - Streamlit es la UI, no React. Adapta los componentes visuales al vocabulario de Streamlit (st.columns, st.container, st.metric, st.dataframe, st.plotly_chart, st.form, st.selectbox, st.number_input, st.expander, st.tabs, etc.).
> - Usa CSS custom con `st.markdown(unsafe_allow_html=True)` SOLO para aplicar la paleta cálida (cream `#F6F1EA`, coral `#E26A4A`, colores por tipo). No reimplementes el iPhone frame ni la navegación tipo tab bar — Streamlit ya tiene multipágina.
> - Cada `pages/*.py` corresponde a una pantalla del prototipo. Mira la captura asociada para entender qué KPIs, listas, gráficas y formularios incluir.
>
> **Spec funcional completo:** *(pega aquí el spec original que usaste — el bloque entero que empieza con "Quiero crear una aplicación personal…")*
>
> **Decisiones de diseño** (extraídas del prototipo, respétalas):
>
> Paleta de colores:
> - Fondo principal: `#F6F1EA` (cream cálido)
> - Superficie de tarjetas: `#FFFFFF`
> - Texto principal: `#1F1B16`
> - Texto secundario: `#6E6359`
> - Acento (botones primarios, FAB): `#E26A4A` (coral)
> - Éxito: `#3DA37A`
>
> Colores por tipo de entrenamiento (úsalos consistentemente en pills, badges, gráficas):
> - Pliometría: `#7B5CD6` (violeta)
> - Potencia: `#E68A2E` (naranja)
> - Fuerza: `#D94B4B` (rojo)
> - Hipertrofia: `#3A82C4` (azul)
> - Otro: `#8A8378` (gris)
>
> Tipografía: system fonts (`-apple-system, sans-serif`). Números tabulares para métricas.
>
> Patrones visuales por pantalla:
> - **Resumen**: grid 2x2 de KPIs (entrenamientos, volumen 30d, peso corporal, ejercicios) con sparklines pequeñas + tarjeta del último entrenamiento + tarjeta de distribución por tipo (barra stacked + leyenda con porcentajes).
> - **Nuevo entrenamiento**: formulario con nombre, fecha, notas (colapsable) en una tarjeta; luego una tarjeta por ejercicio añadido con su tipo en pill clickable; serie como fila inline con peso/reps y un expandible para duración/distancia/altura/intensidad. Botón "Guardar" arriba a la derecha.
> - **Historial**: tarjetas agrupadas por "Esta semana / Semana pasada / Este mes / Mes pasado". Cada tarjeta: fecha grande en cuadrado de color (color del primer tipo del workout), nombre, pills de tipos, contador de series y volumen.
> - **Detalle de entrenamiento**: stats (ejercicios, series, volumen) arriba; luego una tarjeta por ejercicio con tabla de series. La tabla muestra solo las columnas con datos (si nadie metió duración, no muestres columna duración).
> - **Ejercicios**: lista con buscador y filtros por tipo en chips horizontales; tap en + abre sheet/dialog para crear.
> - **Progresión**: dropdown grande para elegir ejercicio; 4 KPIs con delta (peso máx, vol máx, altura máx, entrenamientos); gráfica de líneas para peso máximo, barras para volumen, líneas para altura/duración si aplica; tabla histórica al final.
> - **Peso corporal**: tarjeta con número enorme actual + delta + min/max + gráfica de línea; abajo lista de registros con delta por entrada.
> - **Configuración**: tarjeta del proyecto, tarjetas por cada tipo de entrenamiento con barra de color a la izquierda, contadores de datos, info del stack.
>
> **Datos seed:** además del seed de `training_types` del spec, crea un script `sql/003_seed_demo_data.sql` opcional con ejercicios de ejemplo (sentadilla, press banca, peso muerto, sentadilla con salto, salto al cajón, multisaltos, power clean, push press, sentadilla búlgara, dominadas, curl bíceps, sprint 30m) cada uno con su tipo por defecto.
>
> **Empieza por:** la estructura de archivos completa, requirements.txt, SQL files, README, secrets.toml.example, src/supabase_client.py, src/utils.py, src/services.py con todas las funciones del spec, src/charts.py con Plotly siguiendo la paleta. Luego app.py (página de inicio) y cada `pages/*.py` en orden de prioridad: 1_Nuevo_entrenamiento → 2_Historial → 3_Ejercicios → 4_Progresion → 5_Peso_corporal → 6_Configuracion.
>
> Cuando termines, déjame una checklist de qué probar y los pasos exactos para arrancar (crear proyecto Supabase, copiar URL+key a secrets.toml, ejecutar el SQL, `streamlit run app.py`).

### 3. Adjunta a Codex

Junto al prompt anterior, adjunta:
1. **Las capturas** de cada pantalla (paso 1)
2. **El archivo `Fitness Tracker.html`** (opcional pero útil — Codex puede abrirlo)
3. **Tu spec original** (el bloque grande con la estructura, SQL, funciones)

### 4. Itera

Pídele que implemente página por página. Después de cada página:
- Compara con la captura correspondiente
- Si una métrica/gráfica no aparece como en el prototipo, dile literalmente: *"En la captura de Progresión hay un KPI grande de Peso Máximo arriba a la izquierda con su delta verde — añádelo a `pages/4_Progresion.py`"*.

### 5. Despliegue

Cuando funcione local:
- Streamlit Community Cloud (gratis): conecta el repo en GitHub y mete los secrets en el dashboard
- Las credenciales de Supabase no se suben al repo (ya están en `.gitignore`)

---

## Resumen ultra-corto

1. Captura cada pantalla del prototipo
2. Crea proyecto Supabase, copia URL + anon key
3. Manda a Codex: prompt de arriba + capturas + spec original + HTML
4. Itera pantalla por pantalla comparando con cada captura
5. Despliega en Streamlit Cloud cuando esté

## Tip clave

**No le pidas a Codex que reproduzca el iPhone frame ni la tab bar.** Eso es del prototipo móvil; Streamlit ya tiene su propia navegación con sidebar/multipágina. Lo que tiene que copiar es la **paleta de colores, los KPIs, las tarjetas, la jerarquía visual y la organización de la información** — no la cromática iOS.
