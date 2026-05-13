// Helpers + iconos + componentes compartidos

const fmtDate = (iso, opts = {}) => {
  const months = ['ene','feb','mar','abr','may','jun','jul','ago','sep','oct','nov','dic'];
  const monthsLong = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
  const days = ['dom','lun','mar','mié','jue','vie','sáb'];
  const [y, m, da] = iso.split('-').map(Number);
  const dt = new Date(y, m - 1, da);
  if (opts.long) return `${days[dt.getDay()]}, ${da} de ${monthsLong[m-1]}`;
  if (opts.full) return `${da} ${months[m-1]} ${String(y).slice(2)}`;
  return `${da} ${months[m-1]}`;
};

const daysAgo = (iso) => {
  const [y, m, da] = iso.split('-').map(Number);
  const target = Date.UTC(y, m - 1, da);
  const today = Date.UTC(2026, 4, 10);
  return Math.floor((today - target) / (1000 * 60 * 60 * 24));
};

const relativeDay = (iso) => {
  const n = daysAgo(iso);
  if (n === 0) return 'hoy';
  if (n === 1) return 'ayer';
  if (n < 7) return `hace ${n} días`;
  if (n < 14) return 'la semana pasada';
  if (n < 30) return `hace ${Math.floor(n/7)} sem`;
  return `hace ${Math.floor(n/30)} meses`;
};

const sum = (arr, fn = x => x) => arr.reduce((a, x) => a + (fn(x) || 0), 0);
const max = (arr, fn = x => x) => arr.reduce((a, x) => Math.max(a, fn(x) || 0), 0);

// ─── Iconos ──────────────────────────────────────────────────
const Icon = ({ name, size = 22, color = 'currentColor', stroke = 1.8 }) => {
  const s = stroke;
  const p = { fill: 'none', stroke: color, strokeWidth: s, strokeLinecap: 'round', strokeLinejoin: 'round' };
  const paths = {
    home: <><path {...p} d="M3 11l9-8 9 8"/><path {...p} d="M5 9.5V20a1 1 0 001 1h4v-6h4v6h4a1 1 0 001-1V9.5"/></>,
    list: <><path {...p} d="M4 6h16M4 12h16M4 18h10"/></>,
    chart: <><path {...p} d="M4 19V5M4 19h16"/><path {...p} d="M8 15l3-4 3 2 4-6"/></>,
    more: <><circle {...p} cx="5" cy="12" r="1.3"/><circle {...p} cx="12" cy="12" r="1.3"/><circle {...p} cx="19" cy="12" r="1.3"/></>,
    plus: <><path {...p} d="M12 5v14M5 12h14"/></>,
    plusSm: <><path {...p} d="M12 6v12M6 12h12"/></>,
    back: <><path {...p} d="M15 5l-7 7 7 7"/></>,
    close: <><path {...p} d="M6 6l12 12M18 6L6 18"/></>,
    chev: <><path {...p} d="M9 5l7 7-7 7"/></>,
    chevDn: <><path {...p} d="M5 9l7 7 7-7"/></>,
    check: <><path {...p} d="M5 12l5 5 9-11"/></>,
    dot: <><circle cx="12" cy="12" r="3" fill={color} stroke="none"/></>,
    flame: <><path {...p} d="M12 3c1 4 5 5 5 10a5 5 0 11-10 0c0-3 2-3 2-6 1 1 3 1 3-4z"/></>,
    weight: <><rect {...p} x="3" y="8" width="18" height="9" rx="2"/><path {...p} d="M8 12v2M12 11v3M16 12v2"/></>,
    body: <><circle {...p} cx="12" cy="5" r="2.5"/><path {...p} d="M12 8v6M8 11l4-2 4 2M9 21l3-7 3 7"/></>,
    dumbbell: <><path {...p} d="M3 9v6M6 7v10M18 7v10M21 9v6M6 12h12"/></>,
    calendar: <><rect {...p} x="3" y="5" width="18" height="16" rx="2"/><path {...p} d="M3 9h18M8 3v4M16 3v4"/></>,
    clock: <><circle {...p} cx="12" cy="12" r="9"/><path {...p} d="M12 7v5l3 2"/></>,
    bolt: <><path {...p} d="M13 2L4 14h7l-1 8 9-12h-7l1-8z"/></>,
    target: <><circle {...p} cx="12" cy="12" r="9"/><circle {...p} cx="12" cy="12" r="5"/><circle {...p} cx="12" cy="12" r="1.5" fill={color}/></>,
    filter: <><path {...p} d="M4 5h16l-6 8v6l-4-2v-4z"/></>,
    edit: <><path {...p} d="M4 20h4l10-10-4-4L4 16v4z"/><path {...p} d="M13 6l4 4"/></>,
    info: <><circle {...p} cx="12" cy="12" r="9"/><path {...p} d="M12 11v6"/><circle cx="12" cy="8" r="1" fill={color} stroke="none"/></>,
    settings: <><circle {...p} cx="12" cy="12" r="3"/><path {...p} d="M19.4 15a1.7 1.7 0 00.3 1.8l.1.1a2 2 0 11-2.8 2.8l-.1-.1a1.7 1.7 0 00-1.8-.3 1.7 1.7 0 00-1 1.5V21a2 2 0 11-4 0v-.1a1.7 1.7 0 00-1.1-1.6 1.7 1.7 0 00-1.8.3l-.1.1a2 2 0 11-2.8-2.8l.1-.1a1.7 1.7 0 00.3-1.8 1.7 1.7 0 00-1.5-1H3a2 2 0 110-4h.1a1.7 1.7 0 001.6-1.1 1.7 1.7 0 00-.3-1.8l-.1-.1a2 2 0 112.8-2.8l.1.1a1.7 1.7 0 001.8.3H9a1.7 1.7 0 001-1.5V3a2 2 0 114 0v.1a1.7 1.7 0 001 1.5 1.7 1.7 0 001.8-.3l.1-.1a2 2 0 112.8 2.8l-.1.1a1.7 1.7 0 00-.3 1.8V9a1.7 1.7 0 001.5 1H21a2 2 0 110 4h-.1a1.7 1.7 0 00-1.5 1z"/></>,
    arrow: <><path {...p} d="M5 12h14M13 5l7 7-7 7"/></>,
    trend: <><path {...p} d="M3 17l6-6 4 4 8-9"/><path {...p} d="M14 6h7v7"/></>,
    sparkles: <><path {...p} d="M12 3v3M12 18v3M3 12h3M18 12h3M5 5l2 2M17 17l2 2M5 19l2-2M17 7l2-2"/></>,
    search: <><circle {...p} cx="11" cy="11" r="7"/><path {...p} d="M20 20l-3.5-3.5"/></>,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" style={{ display: 'block', flexShrink: 0 }}>
      {paths[name] || paths.dot}
    </svg>
  );
};

// ─── Tipo pill (Pliometría, Fuerza...) ────────────────────────
function TypePill({ type, size = 'md' }) {
  const sizes = {
    sm: { fs: 10, py: 2, px: 7, dot: 5, gap: 5 },
    md: { fs: 11, py: 3, px: 9, dot: 6, gap: 6 },
    lg: { fs: 12, py: 5, px: 11, dot: 7, gap: 7 },
  }[size];
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: sizes.gap,
      padding: `${sizes.py}px ${sizes.px}px`, borderRadius: 999,
      background: type.color + '1A',
      color: type.color,
      fontSize: sizes.fs, fontWeight: 600, letterSpacing: 0.2,
      whiteSpace: 'nowrap',
    }}>
      <span style={{ width: sizes.dot, height: sizes.dot, borderRadius: 99, background: type.color }} />
      {type.name}
    </span>
  );
}

// ─── Card ────────────────────────────────────────────────────
function Card({ children, style = {}, onClick, padding = 16, ...rest }) {
  const t = useTheme();
  return (
    <div onClick={onClick} style={{
      background: t.surface,
      borderRadius: 22,
      padding,
      boxShadow: t.shadow,
      cursor: onClick ? 'pointer' : 'default',
      transition: 'transform 0.1s',
      ...style,
    }} {...rest}>
      {children}
    </div>
  );
}

// ─── Section header ──────────────────────────────────────────
function SectionLabel({ children, action, onAction }) {
  const t = useTheme();
  return (
    <div style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
      padding: '4px 20px 8px',
    }}>
      <div style={{ fontSize: 13, fontWeight: 600, letterSpacing: 0.6, textTransform: 'uppercase', color: t.textMuted }}>{children}</div>
      {action && (
        <button onClick={onAction} style={{
          background: 'none', border: 'none', color: t.accent,
          fontSize: 14, fontWeight: 600, padding: 0, cursor: 'pointer',
        }}>{action}</button>
      )}
    </div>
  );
}

// ─── KPI ─────────────────────────────────────────────────────
function KPI({ label, value, unit, delta, deltaTone, sparkline, icon, accent }) {
  const t = useTheme();
  return (
    <Card padding={14} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: t.textMuted, fontSize: 11, fontWeight: 700, letterSpacing: 0.4 }}>
        {icon && <span style={{ color: accent || t.accent, display: 'flex' }}><Icon name={icon} size={13} stroke={2.2} /></span>}
        <span style={{ flex: 1, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{label}</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
        <span style={{ fontSize: 26, fontWeight: 700, color: t.text, letterSpacing: -0.6, lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>{value}</span>
        {unit && <span style={{ fontSize: 12, fontWeight: 600, color: t.textMuted }}>{unit}</span>}
        {delta && (
          <span style={{
            marginLeft: 'auto', fontSize: 11, fontWeight: 700,
            color: deltaTone === 'down' ? t.success : t.success,
          }}>{delta}</span>
        )}
      </div>
      {sparkline && <div style={{ height: 28, marginTop: 2 }}>{sparkline}</div>}
    </Card>
  );
}

// ─── Sparkline ───────────────────────────────────────────────
function Sparkline({ values, color, fill = true, height = 28 }) {
  const t = useTheme();
  if (!values || values.length < 2) return <div style={{ height, color: t.textSubtle, fontSize: 11 }}>—</div>;
  const w = 100, h = height;
  const min = Math.min(...values), maxV = Math.max(...values);
  const range = maxV - min || 1;
  const pts = values.map((v, i) => [
    (i / (values.length - 1)) * w,
    h - ((v - min) / range) * (h - 4) - 2,
  ]);
  const path = pts.map((p, i) => (i === 0 ? `M${p[0]},${p[1]}` : `L${p[0]},${p[1]}`)).join(' ');
  const area = `${path} L${w},${h} L0,${h} Z`;
  const c = color || t.accent;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} width="100%" height={h} preserveAspectRatio="none">
      {fill && (
        <>
          <defs>
            <linearGradient id={`g${c.replace('#','')}`} x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor={c} stopOpacity="0.28"/>
              <stop offset="1" stopColor={c} stopOpacity="0"/>
            </linearGradient>
          </defs>
          <path d={area} fill={`url(#g${c.replace('#','')})`} />
        </>
      )}
      <path d={path} fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ─── Botón primario ──────────────────────────────────────────
function Button({ children, onClick, variant = 'primary', disabled = false, full = false, size = 'md', style = {} }) {
  const t = useTheme();
  const styles = {
    primary: { bg: t.accent, fg: '#fff', border: 'transparent' },
    secondary: { bg: t.surfaceSunken, fg: t.text, border: 'transparent' },
    ghost: { bg: 'transparent', fg: t.accent, border: 'transparent' },
    danger: { bg: 'transparent', fg: '#D94B4B', border: 'transparent' },
  }[variant];
  const sizes = { sm: { py: 8, px: 14, fs: 13, br: 10 }, md: { py: 12, px: 18, fs: 15, br: 14 }, lg: { py: 14, px: 22, fs: 16, br: 16 } }[size];
  return (
    <button onClick={onClick} disabled={disabled} style={{
      background: styles.bg, color: styles.fg, border: 'none',
      padding: `${sizes.py}px ${sizes.px}px`, borderRadius: sizes.br,
      fontSize: sizes.fs, fontWeight: 600, letterSpacing: -0.1,
      width: full ? '100%' : undefined,
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.4 : 1,
      fontFamily: 'inherit',
      ...style,
    }}>{children}</button>
  );
}

// ─── Sheet (modal bottom sheet) ──────────────────────────────
function Sheet({ open, onClose, children, title, height = '90%' }) {
  const t = useTheme();
  if (!open) return null;
  return (
    <div style={{
      position: 'absolute', inset: 0, zIndex: 100,
      background: t.scrim,
      display: 'flex', alignItems: 'flex-end',
      animation: 'fadeIn 0.18s ease',
    }} onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} style={{
        background: t.surface,
        width: '100%', maxHeight: height, height,
        borderTopLeftRadius: 26, borderTopRightRadius: 26,
        boxShadow: t.shadow,
        display: 'flex', flexDirection: 'column',
        animation: 'slideUp 0.24s cubic-bezier(0.4,0,0.2,1)',
      }}>
        <div style={{
          padding: '10px 0 4px', display: 'flex', flexDirection: 'column', alignItems: 'center',
        }}>
          <div style={{ width: 36, height: 5, borderRadius: 99, background: t.border }} />
        </div>
        {title && (
          <div style={{
            padding: '10px 20px 4px',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}>
            <div style={{ fontSize: 18, fontWeight: 700, color: t.text }}>{title}</div>
            <button onClick={onClose} style={{
              background: t.surfaceSunken, border: 'none', borderRadius: 99,
              width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: t.textMuted, cursor: 'pointer',
            }}><Icon name="close" size={18} /></button>
          </div>
        )}
        <div style={{ overflow: 'auto', flex: 1 }}>{children}</div>
      </div>
    </div>
  );
}

// ─── Input field ─────────────────────────────────────────────
function Field({ label, children, hint, inline = false }) {
  const t = useTheme();
  return (
    <div style={{
      display: 'flex', flexDirection: inline ? 'row' : 'column', gap: inline ? 12 : 6,
      alignItems: inline ? 'center' : 'stretch', justifyContent: inline ? 'space-between' : 'flex-start',
    }}>
      <div style={{ fontSize: 13, fontWeight: 600, color: t.textMuted, letterSpacing: 0.1 }}>{label}</div>
      <div style={{ flex: inline ? 1 : undefined }}>{children}</div>
      {hint && <div style={{ fontSize: 11, color: t.textSubtle }}>{hint}</div>}
    </div>
  );
}

function TextInput({ value, onChange, placeholder, type = 'text', style = {}, suffix, align }) {
  const t = useTheme();
  return (
    <div style={{
      display: 'flex', alignItems: 'center',
      background: t.surfaceSunken, borderRadius: 12,
      padding: '11px 14px', gap: 8,
    }}>
      <input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} type={type}
        inputMode={type === 'number' ? 'decimal' : undefined}
        style={{
          flex: 1, background: 'transparent', border: 'none', outline: 'none',
          fontSize: 16, color: t.text, fontFamily: 'inherit', textAlign: align,
          minWidth: 0, padding: 0,
          ...style,
        }} />
      {suffix && <span style={{ color: t.textMuted, fontSize: 13, fontWeight: 600 }}>{suffix}</span>}
    </div>
  );
}

// ─── Empty state ─────────────────────────────────────────────
function Empty({ icon = 'info', title, subtitle, action, onAction }) {
  const t = useTheme();
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
      padding: '36px 28px', textAlign: 'center',
    }}>
      <div style={{
        width: 48, height: 48, borderRadius: 99, background: t.surfaceSunken,
        display: 'flex', alignItems: 'center', justifyContent: 'center', color: t.textMuted,
      }}>
        <Icon name={icon} size={22} />
      </div>
      <div style={{ fontSize: 15, fontWeight: 700, color: t.text }}>{title}</div>
      {subtitle && <div style={{ fontSize: 13, color: t.textMuted, lineHeight: 1.45 }}>{subtitle}</div>}
      {action && <div style={{ marginTop: 6 }}><Button onClick={onAction} size="sm">{action}</Button></div>}
    </div>
  );
}

// ─── Toast ───────────────────────────────────────────────────
function Toast({ message, kind = 'success', onDone }) {
  const t = useTheme();
  React.useEffect(() => {
    const id = setTimeout(onDone, 2400);
    return () => clearTimeout(id);
  }, []);
  const colors = {
    success: { bg: t.success, fg: '#fff' },
    error: { bg: '#D94B4B', fg: '#fff' },
    warning: { bg: '#E29A2E', fg: '#fff' },
  }[kind];
  return (
    <div style={{
      position: 'absolute', bottom: 110, left: 16, right: 16, zIndex: 200,
      background: colors.bg, color: colors.fg,
      borderRadius: 16, padding: '12px 16px',
      fontSize: 14, fontWeight: 600, letterSpacing: -0.1,
      boxShadow: t.shadow,
      display: 'flex', alignItems: 'center', gap: 10,
      animation: 'slideUp 0.24s cubic-bezier(0.4,0,0.2,1)',
    }}>
      <Icon name={kind === 'success' ? 'check' : 'info'} size={18} stroke={2.5} />
      {message}
    </div>
  );
}

Object.assign(window, {
  fmtDate, daysAgo, relativeDay, sum, max,
  Icon, TypePill, Card, SectionLabel, KPI, Sparkline,
  Button, Sheet, Field, TextInput, Empty, Toast,
});
