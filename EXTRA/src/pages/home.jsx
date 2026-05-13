// Página Inicio (Resumen) — dashboard

function PageHome({ store, onNav, onOpenWorkout }) {
  const t = useTheme();
  const { workouts, exercises, bodyWeight, trainingTypes, getType, getEx } = store;

  const lastWorkout = workouts[0];
  const lastWeight = bodyWeight[0];

  // últimos 7 días
  const last7 = workouts.filter(w => daysAgo(w.date) <= 7);
  const last30 = workouts.filter(w => daysAgo(w.date) <= 30);

  // volumen total 30d
  const volume30 = sum(last30.flatMap(w => w.exercises.flatMap(e => e.sets)),
    s => (s.weight && s.reps) ? s.weight * s.reps : 0);

  // sparkline: volumen por entrenamiento, últimos 30d
  const volSpark = last30.slice().reverse().map(w =>
    sum(w.exercises.flatMap(e => e.sets), s => (s.weight && s.reps) ? s.weight * s.reps : 0)
  );

  // sparkline peso corporal
  const wSpark = bodyWeight.slice(0, 8).reverse().map(b => b.weight);

  // distribución por tipo (últimos 30d) → series count por tipo
  const typeCount = {};
  for (const w of last30) {
    for (const we of w.exercises) {
      typeCount[we.training_type_id] = (typeCount[we.training_type_id] || 0) + (we.sets?.length || 0);
    }
  }
  const totalSeries = Object.values(typeCount).reduce((a, b) => a + b, 0);

  return (
    <div style={{ paddingBottom: 110 }}>
      <TopBar
        title="Hola 👋"
        subtitle={`${fmtDate('2026-05-10', { long: true })} · ${last7.length} ${last7.length === 1 ? 'entrenamiento' : 'entrenamientos'} esta semana`}
      />

      {/* KPI Grid */}
      <div style={{ padding: '8px 16px 12px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        <KPI
          label="ENTRENAMIENTOS"
          value={workouts.length}
          icon="dumbbell"
          delta={`+${last7.length} 7d`}
          sparkline={<Sparkline values={volSpark} />}
        />
        <KPI
          label="VOLUMEN 30D"
          value={Math.round(volume30 / 1000).toLocaleString('es')}
          unit="t"
          icon="bolt"
          accent="#7B5CD6"
          sparkline={<Sparkline values={volSpark} color="#7B5CD6" />}
        />
        <KPI
          label="PESO CORPORAL"
          value={lastWeight ? lastWeight.weight.toFixed(1) : '—'}
          unit="kg"
          icon="body"
          accent="#3A82C4"
          delta={lastWeight && bodyWeight[7] ? `${(lastWeight.weight - bodyWeight[7].weight).toFixed(1)}` : null}
          deltaTone="down"
          sparkline={<Sparkline values={wSpark} color="#3A82C4" />}
        />
        <KPI
          label="EJERCICIOS"
          value={exercises.length}
          icon="target"
          accent="#3DA37A"
        />
      </div>

      {/* Último entrenamiento */}
      <SectionLabel>Último entrenamiento</SectionLabel>
      <div style={{ padding: '0 16px' }}>
        <Card onClick={() => onOpenWorkout(lastWorkout.id)} padding={0} style={{ overflow: 'hidden' }}>
          <div style={{ padding: '14px 16px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 0.5, color: t.textMuted, textTransform: 'uppercase' }}>
                {relativeDay(lastWorkout.date)} · {fmtDate(lastWorkout.date)}
              </div>
              <div style={{ fontSize: 18, fontWeight: 700, color: t.text, marginTop: 2 }}>{lastWorkout.name}</div>
            </div>
            <Icon name="chev" size={16} color={t.textSubtle} stroke={2.2} />
          </div>
          <div style={{ height: 1, background: t.border }} />
          <div style={{ padding: '10px 16px 14px', display: 'flex', flexDirection: 'column', gap: 10 }}>
            {lastWorkout.exercises.map((we, i) => {
              const ex = getEx(we.exercise_id);
              const ty = getType(we.training_type_id);
              const setsCount = we.sets.length;
              const maxW = max(we.sets, s => s.weight || 0);
              return (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 600, color: t.text }}>{ex?.name}</div>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginTop: 3 }}>
                      <TypePill type={ty} size="sm" />
                      <span style={{ fontSize: 12, color: t.textMuted }}>
                        {setsCount} {setsCount === 1 ? 'serie' : 'series'}{maxW ? ` · ${maxW}kg` : ''}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      {/* Distribución por tipo (30d) */}
      <SectionLabel>Distribución 30 días</SectionLabel>
      <div style={{ padding: '0 16px' }}>
        <Card>
          <div style={{ fontSize: 12, color: t.textMuted, fontWeight: 600, letterSpacing: 0.2, marginBottom: 10 }}>
            {totalSeries} series totales
          </div>
          {/* Barra stacked */}
          <div style={{ display: 'flex', height: 12, borderRadius: 99, overflow: 'hidden', background: t.surfaceSunken }}>
            {trainingTypes.map(tt => {
              const pct = totalSeries ? (typeCount[tt.id] || 0) / totalSeries * 100 : 0;
              if (!pct) return null;
              return <div key={tt.id} style={{ width: `${pct}%`, background: tt.color }} />;
            })}
          </div>
          <div style={{ marginTop: 14, display: 'grid', gridTemplateColumns: '1fr 1fr', rowGap: 8, columnGap: 16 }}>
            {trainingTypes.map(tt => {
              const count = typeCount[tt.id] || 0;
              const pct = totalSeries ? Math.round(count / totalSeries * 100) : 0;
              return (
                <div key={tt.id} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ width: 8, height: 8, borderRadius: 99, background: tt.color }} />
                  <span style={{ fontSize: 13, fontWeight: 600, color: t.text, flex: 1 }}>{tt.name}</span>
                  <span style={{ fontSize: 12, fontWeight: 700, color: t.textMuted, fontVariantNumeric: 'tabular-nums' }}>{pct}%</span>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      {/* Acciones rápidas */}
      <SectionLabel>Acciones rápidas</SectionLabel>
      <div style={{ padding: '0 16px 8px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        <QuickAction icon="weight" label="Registrar peso" color="#3A82C4" onClick={() => onNav('body-weight')} />
        <QuickAction icon="dumbbell" label="Nuevo ejercicio" color="#3DA37A" onClick={() => onNav('exercises')} />
      </div>
    </div>
  );
}

function QuickAction({ icon, label, color, onClick }) {
  const t = useTheme();
  return (
    <Card onClick={onClick} padding={14} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <div style={{
        width: 36, height: 36, borderRadius: 12,
        background: color + '1A', color,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <Icon name={icon} size={20} stroke={2} />
      </div>
      <div style={{ fontSize: 14, fontWeight: 600, color: t.text }}>{label}</div>
    </Card>
  );
}

window.PageHome = PageHome;
