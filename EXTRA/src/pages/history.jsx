// Página Historial

function PageHistory({ store, onOpenWorkout }) {
  const t = useTheme();
  const { workouts, getEx, getType } = store;

  // Group by week
  const grouped = React.useMemo(() => {
    const groups = {};
    for (const w of workouts) {
      const ago = daysAgo(w.date);
      let key;
      if (ago <= 0) key = 'Esta semana';
      else if (ago <= 7) key = 'Esta semana';
      else if (ago <= 14) key = 'La semana pasada';
      else if (ago <= 30) key = 'Este mes';
      else if (ago <= 60) key = 'Mes pasado';
      else key = 'Anteriores';
      (groups[key] = groups[key] || []).push(w);
    }
    return groups;
  }, [workouts]);

  return (
    <div style={{ paddingBottom: 110 }}>
      <TopBar
        title="Historial"
        subtitle={`${workouts.length} entrenamientos`}
      />

      {Object.entries(grouped).map(([label, list]) => (
        <div key={label}>
          <SectionLabel>{label}</SectionLabel>
          <div style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
            {list.map(w => <WorkoutCard key={w.id} workout={w} getEx={getEx} getType={getType} onClick={() => onOpenWorkout(w.id)} />)}
          </div>
        </div>
      ))}
    </div>
  );
}

function WorkoutCard({ workout, getEx, getType, onClick }) {
  const t = useTheme();
  const totalSets = sum(workout.exercises, e => e.sets.length);
  const types = [...new Set(workout.exercises.map(e => e.training_type_id))]
    .map(id => getType(id)).filter(Boolean);
  const volume = sum(workout.exercises.flatMap(e => e.sets), s => (s.weight && s.reps) ? s.weight * s.reps : 0);

  return (
    <Card onClick={onClick} padding={14}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{
          width: 44, height: 44, borderRadius: 12,
          background: types[0]?.color + '18' || t.surfaceSunken,
          color: types[0]?.color || t.textMuted,
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
        }}>
          <span style={{ fontSize: 16, fontWeight: 700, lineHeight: 1 }}>{workout.date.slice(8, 10)}</span>
          <span style={{ fontSize: 9, fontWeight: 600, letterSpacing: 0.5, textTransform: 'uppercase', marginTop: 1 }}>
            {fmtDate(workout.date).slice(-3)}
          </span>
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: t.text, lineHeight: 1.2 }}>{workout.name}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 4, flexWrap: 'wrap' }}>
            {types.map(ty => <TypePill key={ty.id} type={ty} size="sm" />)}
          </div>
        </div>
        <div style={{ textAlign: 'right', flexShrink: 0 }}>
          <div style={{ fontSize: 12, color: t.textMuted, fontWeight: 600 }}>{totalSets} series</div>
          {volume > 0 && <div style={{ fontSize: 11, color: t.textSubtle, marginTop: 2 }}>{(volume / 1000).toFixed(1)}t vol</div>}
        </div>
      </div>
    </Card>
  );
}

// ─── Detalle de entrenamiento ────────────────────────────────
function PageWorkoutDetail({ store, workoutId, onBack }) {
  const t = useTheme();
  const { workouts, getEx, getType } = store;
  const w = workouts.find(x => x.id === workoutId);
  if (!w) return null;

  const totalSets = sum(w.exercises, e => e.sets.length);
  const totalVolume = sum(w.exercises.flatMap(e => e.sets), s => (s.weight && s.reps) ? s.weight * s.reps : 0);
  const types = [...new Set(w.exercises.map(e => e.training_type_id))].map(id => getType(id)).filter(Boolean);

  return (
    <div style={{ paddingBottom: 110 }}>
      <TopBar
        title={w.name}
        subtitle={fmtDate(w.date, { long: true })}
        onBack={onBack}
      />

      {/* Stats */}
      <div style={{ padding: '4px 16px 12px', display: 'flex', gap: 8 }}>
        <SummaryStat label="Ejercicios" value={w.exercises.length} />
        <SummaryStat label="Series" value={totalSets} />
        {totalVolume > 0 && <SummaryStat label="Volumen" value={`${(totalVolume / 1000).toFixed(1)}t`} />}
      </div>

      {types.length > 0 && (
        <div style={{ padding: '0 20px 12px', display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {types.map(ty => <TypePill key={ty.id} type={ty} size="md" />)}
        </div>
      )}

      {w.notes && (
        <div style={{ padding: '0 16px 12px' }}>
          <Card padding={12} style={{ background: t.accentSoft, boxShadow: 'none', display: 'flex', gap: 8 }}>
            <Icon name="info" size={16} color={t.accent} />
            <div style={{ fontSize: 13, color: t.text, lineHeight: 1.4 }}>{w.notes}</div>
          </Card>
        </div>
      )}

      {/* Ejercicios */}
      <div style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {w.exercises.map((we, i) => (
          <ExerciseDetailCard
            key={i} we={we} getEx={getEx} getType={getType} idx={i + 1}
          />
        ))}
      </div>
    </div>
  );
}

function SummaryStat({ label, value }) {
  const t = useTheme();
  return (
    <Card padding={12} style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
      <span style={{ fontSize: 10, fontWeight: 600, color: t.textMuted, letterSpacing: 0.4, textTransform: 'uppercase' }}>{label}</span>
      <span style={{ fontSize: 20, fontWeight: 700, color: t.text, fontVariantNumeric: 'tabular-nums' }}>{value}</span>
    </Card>
  );
}

function ExerciseDetailCard({ we, getEx, getType, idx }) {
  const t = useTheme();
  const ex = getEx(we.exercise_id);
  const ty = getType(we.training_type_id);
  const volume = sum(we.sets, s => (s.weight && s.reps) ? s.weight * s.reps : 0);
  const maxW = max(we.sets, s => s.weight || 0);

  // Detect which columns to show
  const hasWeight = we.sets.some(s => s.weight);
  const hasReps = we.sets.some(s => s.reps);
  const hasDur = we.sets.some(s => s.duration_seconds);
  const hasDist = we.sets.some(s => s.distance_meters);
  const hasH = we.sets.some(s => s.height_cm);

  return (
    <Card padding={0}>
      <div style={{ padding: '14px 16px 10px', display: 'flex', alignItems: 'flex-start', gap: 10 }}>
        <div style={{
          width: 28, height: 28, borderRadius: 8, background: ty.color + '1A',
          color: ty.color, display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 12, fontWeight: 700, flexShrink: 0,
        }}>{idx}</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: t.text, lineHeight: 1.2 }}>{ex?.name}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 5, flexWrap: 'wrap' }}>
            <TypePill type={ty} size="sm" />
            {maxW > 0 && <span style={{ fontSize: 11, color: t.textMuted, fontWeight: 600 }}>máx {maxW}kg</span>}
            {volume > 0 && <span style={{ fontSize: 11, color: t.textMuted, fontWeight: 600 }}>vol {(volume / 1000).toFixed(1)}t</span>}
          </div>
        </div>
      </div>

      {/* Header */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: `28px ${hasWeight ? '1fr' : ''} ${hasReps ? '1fr' : ''} ${hasDur ? '1fr' : ''} ${hasDist ? '1fr' : ''} ${hasH ? '1fr' : ''}`.replace(/\s+/g, ' ').trim(),
        gap: 8, padding: '6px 16px 4px',
        fontSize: 9, fontWeight: 700, letterSpacing: 0.5, color: t.textSubtle, textTransform: 'uppercase',
      }}>
        <div>#</div>
        {hasWeight && <div>Peso</div>}
        {hasReps && <div>Reps</div>}
        {hasDur && <div>Dur</div>}
        {hasDist && <div>Dist</div>}
        {hasH && <div>Alt</div>}
      </div>

      {we.sets.map((s, i) => (
        <div key={i} style={{
          display: 'grid',
          gridTemplateColumns: `28px ${hasWeight ? '1fr' : ''} ${hasReps ? '1fr' : ''} ${hasDur ? '1fr' : ''} ${hasDist ? '1fr' : ''} ${hasH ? '1fr' : ''}`.replace(/\s+/g, ' ').trim(),
          gap: 8, padding: '8px 16px',
          borderTop: `1px solid ${t.border}`,
          fontSize: 14, fontVariantNumeric: 'tabular-nums', alignItems: 'center',
        }}>
          <div style={{
            width: 22, height: 22, borderRadius: 99, background: t.surfaceSunken,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 11, fontWeight: 700, color: t.textMuted,
          }}>{s.set_number}</div>
          {hasWeight && <div style={{ color: t.text, fontWeight: 600 }}>{s.weight ? `${s.weight}kg` : <span style={{ color: t.textSubtle }}>—</span>}</div>}
          {hasReps && <div style={{ color: t.text, fontWeight: 600 }}>{s.reps ?? <span style={{ color: t.textSubtle }}>—</span>}</div>}
          {hasDur && <div style={{ color: t.text }}>{s.duration_seconds ? `${s.duration_seconds}s` : <span style={{ color: t.textSubtle }}>—</span>}</div>}
          {hasDist && <div style={{ color: t.text }}>{s.distance_meters ? `${s.distance_meters}m` : <span style={{ color: t.textSubtle }}>—</span>}</div>}
          {hasH && <div style={{ color: t.text }}>{s.height_cm ? `${s.height_cm}cm` : <span style={{ color: t.textSubtle }}>—</span>}</div>}
        </div>
      ))}

      {/* Intensity / notes */}
      {we.sets.some(s => s.intensity_notes) && (
        <div style={{ padding: '8px 16px 12px', borderTop: `1px solid ${t.border}`, display: 'flex', flexDirection: 'column', gap: 4 }}>
          {we.sets.filter(s => s.intensity_notes).map((s, i) => (
            <div key={i} style={{ fontSize: 12, color: t.textMuted }}>
              <span style={{ fontWeight: 700 }}>#{s.set_number}</span> · {s.intensity_notes}
            </div>
          ))}
        </div>
      )}
      {we.notes && (
        <div style={{ padding: '8px 16px 12px', borderTop: `1px solid ${t.border}`, fontSize: 12, color: t.textMuted }}>
          {we.notes}
        </div>
      )}
    </Card>
  );
}

window.PageHistory = PageHistory;
window.PageWorkoutDetail = PageWorkoutDetail;
