// Chart components — line + bar

function LineChart({ data, color, height = 160, unit = '', formatY = (v) => v, formatX = (v) => v, padding = { top: 16, right: 16, bottom: 24, left: 36 } }) {
  const t = useTheme();
  const ref = React.useRef(null);
  const [hover, setHover] = React.useState(null);
  const [width, setWidth] = React.useState(320);

  React.useEffect(() => {
    if (ref.current) setWidth(ref.current.clientWidth);
    const r = new ResizeObserver(entries => {
      for (const e of entries) setWidth(e.contentRect.width);
    });
    if (ref.current) r.observe(ref.current);
    return () => r.disconnect();
  }, []);

  if (!data || data.length < 2) {
    return <Empty icon="info" title="Faltan datos" subtitle="Registra al menos 2 entrenamientos con esta métrica para ver la gráfica." />;
  }

  const innerW = width - padding.left - padding.right;
  const innerH = height - padding.top - padding.bottom;
  const min = Math.min(...data.map(d => d.y));
  const maxV = Math.max(...data.map(d => d.y));
  const range = maxV - min || 1;
  const yMin = min - range * 0.1;
  const yMax = maxV + range * 0.1;
  const yRange = yMax - yMin;
  const xAt = (i) => padding.left + (data.length === 1 ? innerW / 2 : (i / (data.length - 1)) * innerW);
  const yAt = (v) => padding.top + innerH - ((v - yMin) / yRange) * innerH;

  const pts = data.map((d, i) => [xAt(i), yAt(d.y)]);
  const path = pts.map((p, i) => i === 0 ? `M${p[0]},${p[1]}` : `L${p[0]},${p[1]}`).join(' ');
  const area = `${path} L${pts[pts.length-1][0]},${padding.top + innerH} L${pts[0][0]},${padding.top + innerH} Z`;

  // Y ticks (3 lines)
  const ticks = [yMin + yRange * 0.15, yMin + yRange * 0.5, yMin + yRange * 0.85];

  const handleMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const idx = Math.round(((x - padding.left) / innerW) * (data.length - 1));
    if (idx >= 0 && idx < data.length) setHover(idx);
  };

  return (
    <div ref={ref} style={{ width: '100%', position: 'relative', userSelect: 'none', touchAction: 'pan-y' }}>
      <svg width={width} height={height}
        onMouseMove={handleMove}
        onMouseLeave={() => setHover(null)}
        onTouchMove={(e) => {
          const touch = e.touches[0];
          const rect = e.currentTarget.getBoundingClientRect();
          const x = touch.clientX - rect.left;
          const idx = Math.round(((x - padding.left) / innerW) * (data.length - 1));
          if (idx >= 0 && idx < data.length) setHover(idx);
        }}
        onTouchEnd={() => setHover(null)}
      >
        <defs>
          <linearGradient id={`lcg-${color.replace('#','')}`} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor={color} stopOpacity="0.26" />
            <stop offset="1" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Y grid */}
        {ticks.map((v, i) => (
          <g key={i}>
            <line x1={padding.left} x2={width - padding.right} y1={yAt(v)} y2={yAt(v)}
              stroke={t.chartGrid} strokeWidth="1" />
            <text x={padding.left - 6} y={yAt(v) + 3} fontSize="9" fontWeight="600" fill={t.textSubtle} textAnchor="end">
              {formatY(v)}
            </text>
          </g>
        ))}

        {/* Area */}
        <path d={area} fill={`url(#lcg-${color.replace('#','')})`} />
        {/* Line */}
        <path d={path} fill="none" stroke={color} strokeWidth="2.2" strokeLinejoin="round" strokeLinecap="round" />

        {/* Points */}
        {pts.map((p, i) => (
          <circle key={i} cx={p[0]} cy={p[1]} r={hover === i ? 5 : 3} fill={t.surface} stroke={color} strokeWidth={hover === i ? 2.5 : 2} />
        ))}

        {/* X labels (sparse) */}
        {data.map((d, i) => {
          if (data.length > 6 && i % Math.ceil(data.length / 5) !== 0 && i !== data.length - 1) return null;
          return (
            <text key={i} x={xAt(i)} y={height - 6} fontSize="9" fontWeight="600" fill={t.textSubtle} textAnchor="middle">
              {formatX(d.x)}
            </text>
          );
        })}

        {/* Hover */}
        {hover !== null && (
          <g>
            <line x1={xAt(hover)} x2={xAt(hover)} y1={padding.top} y2={padding.top + innerH} stroke={t.textSubtle} strokeWidth="1" strokeDasharray="3 3" opacity="0.5" />
          </g>
        )}
      </svg>

      {/* Tooltip */}
      {hover !== null && (
        <div style={{
          position: 'absolute',
          left: Math.max(8, Math.min(xAt(hover) - 50, width - 108)),
          top: yAt(data[hover].y) - 50,
          background: t.text, color: t.surface,
          borderRadius: 8, padding: '6px 10px',
          fontSize: 11, fontWeight: 600, lineHeight: 1.3,
          minWidth: 84, pointerEvents: 'none',
          boxShadow: t.shadow,
        }}>
          <div style={{ opacity: 0.7, fontSize: 10 }}>{formatX(data[hover].x, true)}</div>
          <div style={{ fontSize: 14, fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>{formatY(data[hover].y)}{unit}</div>
        </div>
      )}
    </div>
  );
}

function BarChart({ data, color, height = 120, formatY = (v) => v, formatX = (v) => v }) {
  const t = useTheme();
  const ref = React.useRef(null);
  const [width, setWidth] = React.useState(320);
  React.useEffect(() => {
    if (ref.current) setWidth(ref.current.clientWidth);
    const r = new ResizeObserver(entries => {
      for (const e of entries) setWidth(e.contentRect.width);
    });
    if (ref.current) r.observe(ref.current);
    return () => r.disconnect();
  }, []);

  if (!data || data.length < 1) return <Empty icon="info" title="Faltan datos" />;

  const padding = { top: 12, right: 8, bottom: 22, left: 8 };
  const innerW = width - padding.left - padding.right;
  const innerH = height - padding.top - padding.bottom;
  const maxV = Math.max(...data.map(d => d.y), 1);
  const barW = innerW / data.length * 0.65;
  const gap = innerW / data.length * 0.35;

  return (
    <div ref={ref} style={{ width: '100%' }}>
      <svg width={width} height={height}>
        {data.map((d, i) => {
          const h = (d.y / maxV) * innerH;
          const x = padding.left + (i + 0.5) * (innerW / data.length) - barW / 2;
          const y = padding.top + innerH - h;
          return (
            <g key={i}>
              <rect x={x} y={y} width={barW} height={h || 1} rx="3" fill={color} opacity={0.85} />
              <text x={x + barW/2} y={height - 6} fontSize="9" fontWeight="600" fill={t.textSubtle} textAnchor="middle">
                {formatX(d.x)}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

window.LineChart = LineChart;
window.BarChart = BarChart;
