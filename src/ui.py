from html import escape
from textwrap import dedent

import streamlit as st


BACKGROUND = "#F6F1EA"
SURFACE = "#FFFFFF"
TEXT = "#1F1B16"
MUTED = "#6E6359"
PRIMARY = "#E26A4A"
SUCCESS = "#3DA37A"

TRAINING_TYPE_COLORS = {
    "Pliometría": "#7B5CD6",
    "Potencia": "#E68A2E",
    "Fuerza": "#D94B4B",
    "Hipertrofia": "#3A82C4",
    "Otro": "#8A8378",
}


def type_color(name: str | None) -> str:
    return TRAINING_TYPE_COLORS.get(name or "Otro", TRAINING_TYPE_COLORS["Otro"])


def _html(markup: str) -> str:
    return dedent(markup).strip()


def render_html(markup: str):
    cleaned = _html(markup)
    if hasattr(st, "html"):
        st.html(cleaned)
    else:
        st.markdown(cleaned, unsafe_allow_html=True)


def icon_svg(name: str, *, size: int = 22, color: str = "currentColor") -> str:
    icons = {
        "home": f"""
        <svg class="icon" width="{size}" height="{size}" viewBox="0 0 24 24" fill="none" stroke="{color}" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round">
            <path d="M4 10.8 12 4l8 6.8"></path>
            <path d="M6.5 10.5V20h4.5v-4.5h2V20h4.5v-9.5"></path>
        </svg>
        """,
        "list": f"""
        <svg class="icon" width="{size}" height="{size}" viewBox="0 0 24 24" fill="none" stroke="{color}" stroke-width="2.1" stroke-linecap="round">
            <path d="M6 7h12"></path>
            <path d="M6 12h12"></path>
            <path d="M6 17h12"></path>
        </svg>
        """,
        "chart": f"""
        <svg class="icon" width="{size}" height="{size}" viewBox="0 0 24 24" fill="none" stroke="{color}" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round">
            <path d="M4 20V6"></path>
            <path d="M4 20h16"></path>
            <path d="m8 15 3-3 3 2 4-6"></path>
        </svg>
        """,
        "more": f"""
        <svg class="icon" width="{size}" height="{size}" viewBox="0 0 24 24" fill="{color}">
            <circle cx="6" cy="12" r="1.8"></circle>
            <circle cx="12" cy="12" r="1.8"></circle>
            <circle cx="18" cy="12" r="1.8"></circle>
        </svg>
        """,
        "exercise": f"""
        <svg class="icon" width="{size}" height="{size}" viewBox="0 0 24 24" fill="none" stroke="{color}" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">
            <path d="M3 10v4"></path>
            <path d="M6 8v8"></path>
            <path d="M18 8v8"></path>
            <path d="M21 10v4"></path>
            <path d="M6 12h12"></path>
        </svg>
        """,
        "weight": f"""
        <svg class="icon" width="{size}" height="{size}" viewBox="0 0 24 24" fill="none" stroke="{color}" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 7a2 2 0 1 0 0 4a2 2 0 0 0 0-4Z"></path>
            <path d="M9.5 17.5 11 13l-1.5-2"></path>
            <path d="M14.5 17.5 13 13l1.5-2"></path>
            <path d="M11 13h2"></path>
        </svg>
        """,
        "settings": f"""
        <svg class="icon" width="{size}" height="{size}" viewBox="0 0 24 24" fill="none" stroke="{color}" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 8.5a3.5 3.5 0 1 0 0 7a3.5 3.5 0 0 0 0-7Z"></path>
            <path d="M19.4 15a1 1 0 0 0 .2 1.1l.1.1a2 2 0 0 1-2.8 2.8l-.1-.1a1 1 0 0 0-1.1-.2a1 1 0 0 0-.6.9V20a2 2 0 0 1-4 0v-.2a1 1 0 0 0-.6-.9a1 1 0 0 0-1.1.2l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1 1 0 0 0 .2-1.1a1 1 0 0 0-.9-.6H4a2 2 0 0 1 0-4h.2a1 1 0 0 0 .9-.6a1 1 0 0 0-.2-1.1l-.1-.1a2 2 0 0 1 2.8-2.8l.1.1a1 1 0 0 0 1.1.2a1 1 0 0 0 .6-.9V4a2 2 0 0 1 4 0v.2a1 1 0 0 0 .6.9a1 1 0 0 0 1.1-.2l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1 1 0 0 0-.2 1.1a1 1 0 0 0 .9.6H20a2 2 0 0 1 0 4h-.2a1 1 0 0 0-.9.6Z"></path>
        </svg>
        """,
        "fire": f"""
        <svg class="icon" width="{size}" height="{size}" viewBox="0 0 24 24" fill="none" stroke="{color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 3c1 4 5 5 5 10a5 5 0 1 1-10 0c0-3 2-3 2-6c1 1 3 1 3-4Z"></path>
        </svg>
        """,
    }
    return _html(icons[name])


def apply_base_styles():
    render_html(
        f"""
        <style>
        :root {{
            --ft-bg: {BACKGROUND};
            --ft-surface: {SURFACE};
            --ft-text: {TEXT};
            --ft-muted: {MUTED};
            --ft-primary: {PRIMARY};
            --ft-success: {SUCCESS};
            --ft-radius-xl: 28px;
            --ft-radius-lg: 22px;
            --ft-radius-md: 18px;
            --ft-shadow: 0 12px 30px rgba(58, 40, 20, 0.08);
        }}
        html, body, [data-testid="stAppViewContainer"], .stApp {{
            background: var(--ft-bg);
            color: var(--ft-text);
            font-variant-numeric: tabular-nums;
        }}
        [data-testid="stToolbar"] {{
            display: none;
        }}
        header[data-testid="stHeader"] {{
            background: transparent;
        }}
        [data-testid="stSidebar"] {{
            background: rgba(255,255,255,0.72);
            border-right: 1px solid rgba(31, 27, 22, 0.08);
        }}
        [data-testid="stSidebar"] > div:first-child {{
            background: rgba(255,255,255,0.72);
        }}
        [data-testid="stSidebarNav"] {{
            display: none;
        }}
        [data-testid="collapsedControl"] {{
            color: var(--ft-text) !important;
            display: none !important;
            visibility: hidden !important;
        }}
        .block-container {{
            max-width: 860px;
            padding-top: 0.95rem;
            padding-bottom: 4rem;
        }}
        @media (max-width: 768px) {{
            .block-container {{
                max-width: 100%;
                padding: 0.65rem 0.82rem 6.9rem 0.82rem;
            }}
        }}
        .ft-page-head {{
            margin-bottom: 1.1rem;
        }}
        .ft-kicker {{
            color: #8b7d70;
            font-size: 0.9rem;
            text-transform: uppercase;
            letter-spacing: 0.12em;
            font-weight: 700;
            margin-bottom: 0.4rem;
        }}
        .ft-title {{
            margin: 0;
            font-size: clamp(2.3rem, 6vw, 4rem);
            line-height: 0.98;
            letter-spacing: -0.045em;
            color: var(--ft-text);
        }}
        .ft-subtitle {{
            margin-top: 0.45rem;
            color: var(--ft-muted);
            font-size: clamp(1rem, 2.6vw, 1.18rem);
            line-height: 1.45;
        }}
        .ft-card {{
            background: var(--ft-surface);
            border: 1px solid rgba(31, 27, 22, 0.06);
            border-radius: var(--ft-radius-lg);
            padding: 1rem 1.05rem;
            box-shadow: var(--ft-shadow);
            margin-bottom: 0.95rem;
        }}
        @media (max-width: 768px) {{
            .ft-card {{
                border-radius: 24px;
                padding: 0.95rem 1rem;
            }}
        }}
        .ft-card-compact {{
            padding: 0.9rem 1rem;
        }}
        .ft-section-label {{
            margin: 1rem 0 0.65rem 0;
            color: #87796b;
            font-size: 0.95rem;
            text-transform: uppercase;
            letter-spacing: 0.12em;
            font-weight: 700;
        }}
        .ft-kpi {{
            background: var(--ft-surface);
            border: 1px solid rgba(31, 27, 22, 0.06);
            border-radius: 24px;
            padding: 0.95rem 1rem 0.85rem 1rem;
            box-shadow: var(--ft-shadow);
            min-height: 170px;
        }}
        .ft-kpi-title {{
            color: #7e7064;
            text-transform: uppercase;
            letter-spacing: 0.11em;
            font-size: 0.84rem;
            font-weight: 800;
        }}
        .ft-kpi-value {{
            font-size: clamp(2rem, 5vw, 3.2rem);
            line-height: 1;
            letter-spacing: -0.04em;
            font-weight: 800;
            color: var(--ft-text);
            margin-top: 0.45rem;
        }}
        .ft-kpi-suffix {{
            font-size: 0.52em;
            color: var(--ft-muted);
            font-weight: 700;
        }}
        .ft-delta {{
            display: inline-block;
            margin-top: 0.55rem;
            border-radius: 999px;
            padding: 0.2rem 0.58rem;
            font-size: 0.9rem;
            font-weight: 700;
            background: rgba(61, 163, 122, 0.12);
            color: var(--ft-success);
        }}
        .ft-delta-muted {{
            background: rgba(31, 27, 22, 0.06);
            color: var(--ft-muted);
        }}
        .ft-sparkline {{
            margin-top: 0.8rem;
            width: 100%;
            height: 38px;
        }}
        .ft-sparkline svg {{
            width: 100%;
            height: 100%;
        }}
        .ft-list {{
            display: grid;
            gap: 0.85rem;
        }}
        .ft-row-card {{
            background: var(--ft-surface);
            border: 1px solid rgba(31, 27, 22, 0.06);
            border-radius: 24px;
            padding: 0.95rem 1rem;
            box-shadow: var(--ft-shadow);
        }}
        .ft-row-top {{
            display: flex;
            gap: 0.9rem;
            align-items: center;
            justify-content: space-between;
        }}
        .ft-row-date {{
            min-width: 62px;
            height: 62px;
            border-radius: 18px;
            background: #fdf1ef;
            color: var(--ft-text);
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            font-weight: 800;
            line-height: 1.05;
        }}
        .ft-row-date-day {{
            font-size: 1.55rem;
            letter-spacing: -0.04em;
        }}
        .ft-row-date-month {{
            font-size: 0.78rem;
            text-transform: uppercase;
            color: #d36c59;
            letter-spacing: 0.1em;
        }}
        .ft-row-main {{
            flex: 1;
            min-width: 0;
        }}
        .ft-row-title {{
            font-size: 1.05rem;
            font-weight: 800;
            color: var(--ft-text);
            line-height: 1.1;
        }}
        .ft-row-meta {{
            color: var(--ft-muted);
            font-size: 0.92rem;
            margin-top: 0.2rem;
        }}
        .ft-row-side {{
            text-align: right;
            min-width: 68px;
        }}
        .ft-row-side-strong {{
            font-weight: 800;
            color: var(--ft-text);
            font-size: 1.08rem;
        }}
        .ft-row-side-muted {{
            color: var(--ft-muted);
            font-size: 0.9rem;
        }}
        .ft-pills {{
            display: flex;
            flex-wrap: wrap;
            gap: 0.35rem;
            margin-top: 0.4rem;
        }}
        .ft-pill {{
            display: inline-flex;
            align-items: center;
            gap: 0.35rem;
            border-radius: 999px;
            padding: 0.22rem 0.62rem;
            font-size: 0.82rem;
            font-weight: 700;
            white-space: nowrap;
        }}
        .ft-pill-dot {{
            width: 8px;
            height: 8px;
            border-radius: 50%;
            display: inline-block;
        }}
        .ft-button-ghost {{
            border-style: dashed !important;
            border-color: rgba(226, 106, 74, 0.35) !important;
            color: var(--ft-primary) !important;
            background: rgba(255,255,255,0.5) !important;
        }}
        div[data-testid="stVerticalBlockBorderWrapper"] {{
            border-radius: 26px;
            border: 1px solid rgba(31, 27, 22, 0.08);
            box-shadow: var(--ft-shadow);
            background: rgba(255,255,255,0.7);
        }}
        div[data-testid="stForm"] {{
            background: transparent;
            border: none;
            box-shadow: none;
            padding: 0;
        }}
        div[data-testid="stMetric"] {{
            background: var(--ft-surface);
            border: 1px solid rgba(31, 27, 22, 0.06);
            border-radius: 20px;
            padding: 0.8rem 0.85rem;
            box-shadow: var(--ft-shadow);
        }}
        div[data-testid="stMetric"] label {{
            color: #7e7064 !important;
            text-transform: uppercase;
            letter-spacing: 0.08em;
            font-weight: 700;
        }}
        div[data-baseweb="input"] input,
        div[data-baseweb="select"] > div,
        textarea {{
            background: rgba(255,255,255,0.88) !important;
            border: 1px solid rgba(31, 27, 22, 0.06) !important;
            border-radius: 18px !important;
            color: var(--ft-text) !important;
        }}
        textarea {{
            min-height: 110px !important;
        }}
        .stButton > button,
        .stFormSubmitButton > button {{
            min-height: 3.1rem;
            border-radius: 999px;
            border: none;
            background: var(--ft-primary);
            color: #fff7f4;
            font-weight: 800;
            box-shadow: 0 10px 25px rgba(226, 106, 74, 0.28);
        }}
        .stButton > button:hover,
        .stFormSubmitButton > button:hover {{
            background: #d75d3d;
        }}
        div[data-testid="stDataFrame"] {{
            border-radius: 22px;
            overflow: hidden;
            border: 1px solid rgba(31, 27, 22, 0.06);
            box-shadow: var(--ft-shadow);
            background: white;
        }}
        div[data-testid="stAlert"] {{
            border-radius: 18px;
            border: none;
        }}
        .ft-note {{
            color: var(--ft-muted);
            font-size: 0.95rem;
        }}
        .ft-divider {{
            height: 1px;
            background: rgba(31, 27, 22, 0.08);
            margin: 0.85rem 0;
        }}
        .ft-top-nav {{
            display: none !important;
        }}
        .ft-top-link {{
            text-decoration: none;
            color: #6f6257;
            background: rgba(255,255,255,0.76);
            border: 1px solid rgba(31, 27, 22, 0.07);
            border-radius: 999px;
            padding: 0.56rem 0.92rem;
            font-weight: 700;
            font-size: 0.94rem;
        }}
        .ft-top-link.active {{
            background: var(--ft-primary);
            color: white;
            box-shadow: 0 10px 25px rgba(226, 106, 74, 0.28);
        }}
        .ft-quick-card {{
            display:flex;
            align-items:center;
            gap:0.8rem;
            text-decoration:none;
            color:inherit;
        }}
        .ft-quick-icon {{
            width:46px;
            height:46px;
            border-radius:14px;
            display:flex;
            align-items:center;
            justify-content:center;
            flex-shrink:0;
            font-weight:700;
        }}
        .ft-quick-arrow {{
            color:#b0a498;
            font-size:1.15rem;
            font-weight:700;
            margin-left:auto;
        }}
        </style>
        """
    )


def render_page_header(title: str, subtitle: str | None = None, kicker: str | None = None):
    kicker_html = f'<div class="ft-kicker">{escape(kicker)}</div>' if kicker else ""
    subtitle_html = f'<div class="ft-subtitle">{escape(subtitle)}</div>' if subtitle else ""
    render_html(
        f"""
        <div class="ft-page-head">
            {kicker_html}
            <h1 class="ft-title">{escape(title)}</h1>
            {subtitle_html}
        </div>
        """
    )


def render_hero(title: str, subtitle: str):
    render_html(
        f"""
        <div class="ft-card" style="padding: 1.2rem 1.25rem; border-radius: 30px;">
            <h1 class="ft-title" style="font-size: clamp(2.2rem, 5vw, 3.8rem);">{escape(title)}</h1>
            <div class="ft-subtitle">{escape(subtitle)}</div>
        </div>
        """
    )


def render_section_label(text: str):
    render_html(f'<div class="ft-section-label">{escape(text)}</div>')


def render_card(title: str, body: str):
    render_html(
        f"""
        <div class="ft-card">
            <div class="ft-row-title">{title}</div>
            <div class="ft-note" style="margin-top:0.35rem;">{body}</div>
        </div>
        """
    )


def _sparkline_svg(values: list[float], color: str) -> str:
    if not values:
        return ""
    if len(values) == 1:
        values = [values[0], values[0]]
    min_v = min(values)
    max_v = max(values)
    spread = max(max_v - min_v, 1)
    coords = []
    for idx, value in enumerate(values):
        x = idx * (100 / (len(values) - 1))
        y = 30 - ((value - min_v) / spread) * 22
        coords.append(f"{x:.1f},{y:.1f}")
    polyline = " ".join(coords)
    return _html(f"""
    <div class="ft-sparkline">
        <svg viewBox="0 0 100 34" preserveAspectRatio="none">
            <polyline fill="none" stroke="{color}" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round" points="{polyline}"></polyline>
        </svg>
    </div>
    """)


def render_metric_card(title: str, value: str, delta: str | None = None, color: str = PRIMARY, suffix: str | None = None, sparkline: list[float] | None = None):
    suffix_html = f'<span class="ft-kpi-suffix"> {escape(suffix)}</span>' if suffix else ""
    delta_class = "ft-delta" if delta else "ft-delta ft-delta-muted"
    delta_text = escape(delta) if delta else "Sin comparativa"
    render_html(
        f"""
        <div class="ft-kpi">
            <div class="ft-kpi-title">{escape(title)}</div>
            <div class="ft-kpi-value">{escape(value)}{suffix_html}</div>
            <div class="{delta_class}">{delta_text}</div>
            {_sparkline_svg(sparkline or [], color)}
        </div>
        """
    )


def render_type_pills(types: list[str]) -> str:
    pills = []
    for item in types:
        color = type_color(item)
        pills.append(
            _html(f"""
            <span class="ft-pill" style="background:{color}18; color:{color};">
                <span class="ft-pill-dot" style="background:{color};"></span>
                {escape(item)}
            </span>
            """)
        )
    return f'<div class="ft-pills">{"".join(pills)}</div>'


def render_workout_list_card(title: str, day: str, month: str, pills: list[str], right_title: str, right_subtitle: str, subtitle: str | None = None):
    subtitle_html = f'<div class="ft-row-meta">{escape(subtitle)}</div>' if subtitle else ""
    render_html(
        f"""
        <div class="ft-row-card">
            <div class="ft-row-top">
                <div class="ft-row-date">
                    <div class="ft-row-date-day">{escape(day)}</div>
                    <div class="ft-row-date-month">{escape(month)}</div>
                </div>
                <div class="ft-row-main">
                    <div class="ft-row-title">{escape(title)}</div>
                    {render_type_pills(pills)}
                    {subtitle_html}
                </div>
                <div class="ft-row-side">
                    <div class="ft-row-side-strong">{escape(right_title)}</div>
                    <div class="ft-row-side-muted">{escape(right_subtitle)}</div>
                </div>
            </div>
        </div>
        """
    )


def render_quick_action_card(title: str, subtitle: str, color: str, icon_html: str, view: str):
    render_html(
        f"""
        <a href="?view={view}" target="_self" class="ft-quick-card">
            <div class="ft-card" style="padding:0.9rem 1rem; width:100%;">
                <div class="ft-quick-card">
                <div class="ft-quick-icon" style="background:{color}18; color:{color};">
                    {icon_html}
                </div>
                <div style="min-width:0;">
                    <div class="ft-row-title" style="font-size:0.98rem;">{escape(title)}</div>
                    <div class="ft-note" style="margin-top:0.16rem;">{escape(subtitle)}</div>
                </div>
                <div class="ft-quick-arrow">›</div>
                </div>
            </div>
        </a>
        """
    )


def render_mobile_list(items: list[dict], title_key: str, lines_builder):
    for item in items:
        title = escape(str(item.get(title_key, "")))
        lines = [escape(str(line)) for line in lines_builder(item) if line]
        lines_html = "".join(f'<div class="ft-note" style="margin-top:0.18rem;">{line}</div>' for line in lines)
        render_html(
            (
                '<div class="ft-row-card">'
                f'<div class="ft-row-title">{title}</div>'
                f"{lines_html}"
                "</div>"
            ),
        )


def render_distribution_bar(items: list[tuple[str, float]], total_label: str):
    segments = []
    legend = []
    for name, value in items:
        color = type_color(name)
        width = max(value, 4)
        segments.append(f'<div style="height:14px; width:{width}%; background:{color};"></div>')
        legend.append(
            _html(f"""
            <div style="display:flex; align-items:center; justify-content:space-between; gap:0.5rem; margin-top:0.45rem;">
                <div style="display:flex; align-items:center; gap:0.5rem;">
                    <span class="ft-pill-dot" style="background:{color};"></span>
                    <span style="font-weight:700; color:{TEXT};">{escape(name)}</span>
                </div>
                <span style="color:{MUTED}; font-weight:700;">{value:.0f}%</span>
            </div>
            """)
        )

    render_html(
        f"""
        <div class="ft-card">
            <div class="ft-row-title" style="font-size:1rem;">{escape(total_label)}</div>
            <div style="margin-top:0.85rem; overflow:hidden; border-radius:999px; display:flex; background:#ece5dc;">
                {''.join(segments)}
            </div>
            <div style="margin-top:0.75rem;">
                {''.join(legend)}
            </div>
        </div>
        """
    )


def render_navigation(current_view: str) -> str:
    options = [
        ("principal", "Principal"),
        ("nuevo", "Nuevo entrenamiento"),
        ("historial", "Historial"),
        ("ejercicios", "Ejercicios"),
        ("progresion", "Progresión"),
        ("peso", "Peso corporal"),
        ("mas", "Más"),
        ("configuracion", "Configuración"),
    ]
    keys = [key for key, _ in options]
    labels = [label for _, label in options]
    current_key = current_view if current_view in keys else "principal"
    current_index = keys.index(current_key)

    with st.container(border=True):
        st.markdown("### Menú")
        selected_label = st.selectbox(
            "Ir a",
            labels,
            index=current_index,
            key=f"app_nav_value_{current_key}",
            label_visibility="collapsed",
        )
    return keys[labels.index(selected_label)]
