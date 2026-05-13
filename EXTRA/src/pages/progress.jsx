// Página Progresión

function PageProgress({ store, onBack, initialExerciseId }) {
  const t = useTheme();
  const { exercises, workouts, getEx, getType } = store;
  const [selectedId, setSelectedId] = React.useState(initialExerciseId || null);
  const [pickerOpen, setPickerOpen] = React.useState(false);

  // exercises ranked by usage
  const ranked = React.useMemo(() => {
    const uses = {};
    for (const w of workouts) for (const we of w.exercises) uses[we.exercise_id] = (uses[we.exercise_id] || 0) + 1;
    return exercises.map(e => ({ ...e, count: uses[e.id] || 0 })).sort((a, b) => b.count - a.count);
  }, [exercises, workouts]);

  React.useEffect(() => {
    if (!selectedId && ranked.length > 0) setSelectedId(ranked[0].id);
  }, []);

  const selected = selectedId ? getEx(selectedId) : null;
  const rows = selectedId ? exerciseProgress(selectedId, workouts) : [];

  // metrics available
  const hasWeight = rows.some(r => r.max_weight);
  const hasVolume = rows.some(r => r.volume);
  const hasDuration = rows.some(r => r.total_duration);
  const hasDistance = rows.some(r => r.total_distance);
  const hasHeight = rows.some(r => r.max_height);

  const weightSeries = rows.filter(r => r.max_weight).map(r => ({ x: r.date, y: r.max_weight }));
  const volumeSeries = rows.filter(r => r.volume).map(r => ({ x: r.date, y: r.volume }));
  const durationSeries = rows.filter(r => r.total_duration).map(r => ({ x: r.date, y: r.total_duration }));
  const heightSeries = rows.filter(r => r.max_height).map(r => ({ x: r.date, y: r.max_height }));

  // deltas
  const delta = (s) => {
    if (s.length < 2) return null;
    const first = s[0].y, last = s[s.length - 1].y;
    const diff = last - first;
    const pct = ((diff / first) * 100).toFixed(1);
    return { diff: diff.toFixed(1), pct };
  };

  const fmtX = (iso, full) => full ? fmtDate(iso, { long: true }) : fmtDate(iso).replace(' ', '\n');

  return (
    <div style={{ paddingBottom: 110 }}>
      <TopBar
        title="Progresión"
        onBack={onBack}
        subtitle={selected ? selected.name : 'Selecciona un ejercicio'}
      />

      {/* Exercise selector */}
      <div style={{ padding: '4px 16px 12px' }}>
        <button onClick={() => setPickerOpen(true)} style={{
          width: '100%', background: t.surface, border: 'none', borderRadius: 14,
          padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12,
          cursor: 'pointer', boxShadow: t.shadow, fontFamily: 'inherit',
        }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10,
            background: selected && selected.default_type ? getType(selected.default_type).color + '1A' : t.surfaceSunken,
            color: selected && selected.default_type ? getType(selected.default_type).color : t.textMuted,
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}><Icon name="target" size={18} stroke={2} /></div>
          <div style={{ flex: 1, textAlign: 'left' }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: t.textMuted, letterSpacing: 0.3, textTransform: 'uppercase' }}>EJERCICIO</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: t.text }}>{selected ? selected.name : 'Elegir…'}</div>
          </div>
          <Icon name="chev" size={16} color={t.textSubtle} stroke={2.2} />
        </button>
      </div>

      {!selected && (
        <Empty icon="target" title="Selecciona un ejercicio" subtitle="Toca arriba para ver su progresión." />
      )}

      {selected && rows.length === 0 && (
        <Empty icon="info" title="Aún sin entrenamientos" subtitle={`Empieza a registrar series de ${selected.name} para ver progresión.`} />
      )}

      {selected && rows.length > 0 && (
        <>
          {/* Summary chips */}
          <div style={{ padding: '0 16px 12px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {hasWeight && (
              <StatPill label="PESO MÁX" value={`${max(rows, r => r.max_weight || 0)}`} unit="kg"
                delta={delta(weightSeries)} color="#D94B4B" />
            )}
            {hasVolume && (
              <StatPill label="VOL MÁX" value={`${(max(rows, r => r.volume || 0) / 1000).toFixed(1)}`} unit="t"
                delta={delta(volumeSeries)} color="#7B5CD6" />
            )}
            {hasHeight && (
              <StatPill label="ALTURA MÁX" value={`${max(rows, r => r.max_height || 0)}`} unit="cm"
                delta={delta(heightSeries)} color="#3DA37A" />
            )}
            {hasDuration && (
              <StatPill label="DUR ÚLTIMA" value={`${rows[rows.length-1].total_duration?.toFixed(1)}`} unit="s"
                color="#E68A2E" />
            )}
            <StatPill label="ENTRENAMIENTOS" value={rows.length} color={t.text} />
          </div>

          {/* Charts */}
          {hasWeight && (
            <ChartCard title="Peso máximo por sesión" subtitle="Mayor peso levantado en cada entrenamiento">
              <LineChart data={weightSeries} color="#D94B4B"
                formatY={(v) => `${Math.round(v)}`} unit="kg"
                formatX={(iso, full) => fmtX(iso, full)} />
            </ChartCard>
          )}

          {hasVolume && (
            <ChartCard title="Volumen total" subtitle="Peso × repeticiones por sesión">
              <BarChart data={volumeSeries} color="#7B5CD6"
                formatY={(v) => `${(v/1000).toFixed(1)}t`}
                formatX={(iso) => fmtDate(iso).slice(0, 6)} />
            </ChartCard>
          )}

          {hasHeight && (
            <ChartCard title="Altura máxima" subtitle="Pico de cada sesión">
              <LineChart data={heightSeries} color="#3DA37A"
                formatY={(v) => `${Math.round(v)}`} unit="cm"
                formatX={(iso, full) => fmtX(iso, full)} />
            </ChartCard>
          )}

          {hasDuration && (
            <ChartCard title="Duración" subtitle="Tiempo total de la sesión">
              <LineChart data={durationSeries} color="#E68A2E"
                formatY={(v) => `${v.toFixed(1)}`} unit="s"
                formatX={(iso, full) => fmtX(iso, full)} />
            </ChartCard>
          )}

          {/* Table */}
          <SectionLabel>Historial</SectionLabel>
          <div style={{ padding: '0 16px 24px' }}>
            <Card padding={0}>
              <div style={{
                display: 'grid', gridTemplateColumns: '1fr 70px 60px 60px',
                gap: 8, padding: '10px 14px',
                fontSize: 9, fontWeight: 700, letterSpacing: 0.5, color: t.textSubtle, textTransform: 'uppercase',
              }}>
                <div>Fecha · Tipo</div>
                <div style={{ textAlign: 'right' }}>Máx</div>
                <div style={{ textAlign: 'right' }}>Vol</div>
                <div style={{ textAlign: 'right' }}>Series</div>
              </div>
              {[...rows].reverse().map((r, i) => {
                const ty = getType(r.training_type_id);
                return (
                  <div key={i} style={{
                    display: 'grid', gridTemplateColumns: '1fr 70px 60px 60px',
                    gap: 8, padding: '10px 14px', alignItems: 'center',
                    borderTop: `1px solid ${t.border}`,
                    fontSize: 13, fontVariantNumeric: 'tabular-nums',
                  }}>
                    <div style={{ minWidth: 0 }}>
                      <div style={{ fontSize: 13, fontWeight: 600, color: t.text }}>{fmtDate(r.date)}</div>
                      {ty && <div style={{ marginTop: 3 }}><TypePill type={ty} size="sm" /></div>}
                    </div>
                    <div style={{ textAlign: 'right', color: t.text, fontWeight: 600 }}>{r.max_weight ? `${r.max_weight}kg` : '—'}</div>
                    <div style={{ textAlign: 'right', color: t.text, fontWeight: 600 }}>{r.volume ? `${(r.volume/1000).toFixed(1)}t` : '—'}</div>
                    <div style={{ textAlign: 'right', color: t.textMuted }}>{r.sets_count}</div>
                  </div>
                );
              })}
            </Card>
          </div>
        </>
      )}

      <Sheet open={pickerOpen} onClose={() => setPickerOpen(false)} title="Elige ejercicio" height="80%">
        <div style={{ padding: '8px 16px 24px', display: 'flex', flexDirection: 'column', gap: 6 }}>
          {ranked.map(ex => {
            const ty = ex.default_type ? getType(ex.default_type) : null;
            const isSel = ex.id === selectedId;
            return (
              <button key={ex.id} onClick={() => { setSelectedId(ex.id); setPickerOpen(false); }} style={{
                background: isSel ? t.accentSoft : t.surfaceAlt,
                border: 'none', borderRadius: 14,
                padding: '12px 14px', cursor: 'pointer', fontFamily: 'inherit',
                display: 'flex', alignItems: 'center', gap: 12, textAlign: 'left',
              }}>
                <div style={{
                  width: 32, height: 32, borderRadius: 9,
                  background: ty ? ty.color + '1A' : t.surfaceSunken,
                  color: ty ? ty.color : t.textMuted,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}><Icon name="dumbbell" size={16} stroke={2} /></div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 15, fontWeight: 600, color: t.text }}>{ex.name}</div>
                  <div style={{ fontSize: 11, color: t.textMuted, marginTop: 2 }}>
                    {ex.count > 0 ? `${ex.count} ${ex.count === 1 ? 'entrenamiento' : 'entrenamientos'}` : 'Sin datos'}
                  </div>
                </div>
                {isSel && <Icon name="check" size={20} color={t.accent} stroke={2.4} />}
              </button>
            );
          })}
        </div>
      </Sheet>
    </div>
  );
}

function StatPill({ label, value, unit, delta, color }) {
  const t = useTheme();
  return (
    <Card padding={12}>
      <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 0.5, color: t.textMuted }}>{label}</div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginTop: 4 }}>
        <span style={{ fontSize: 22, fontWeight: 700, color: color || t.text, fontVariantNumeric: 'tabular-nums' }}>{value}</span>
        {unit && <span style={{ fontSize: 12, fontWeight: 600, color: t.textMuted }}>{unit}</span>}
      </div>
      {delta && (
        <div style={{ fontSize: 11, marginTop: 3, color: parseFloat(delta.diff) > 0 ? t.success : t.textMuted, fontWeight: 700 }}>
          {parseFloat(delta.diff) > 0 ? '+' : ''}{delta.diff} ({delta.pct}%)
        </div>
      )}
    </Card>
  );
}

function ChartCard({ title, subtitle, children }) {
  const t = useTheme();
  return (
    <div style={{ padding: '0 16px 12px' }}>
      <Card padding={14}>
        <div style={{ fontSize: 14, fontWeight: 700, color: t.text }}>{title}</div>
        {subtitle && <div style={{ fontSize: 12, color: t.textMuted, marginTop: 2 }}>{subtitle}</div>}
        <div style={{ marginTop: 10 }}>{children}</div>
      </Card>
    </div>
  );
}

window.PageProgress = PageProgress;
