// Store + navigation shell

function useStore() {
  // Workouts sorted by date desc (most recent first)
  const sortedWorkouts = [...window.WORKOUTS].sort((a, b) => b.date.localeCompare(a.date));
  const [workouts, setWorkouts] = React.useState(sortedWorkouts);
  const [exercises, setExercises] = React.useState(window.EXERCISES);
  const sortedBW = [...window.BODY_WEIGHT].sort((a, b) => b.entry_date.localeCompare(a.entry_date));
  const [bodyWeight, setBodyWeight] = React.useState(sortedBW);
  const [trainingTypes] = React.useState(window.TRAINING_TYPES);

  const getType = React.useCallback((id) => trainingTypes.find(t => t.id === id), [trainingTypes]);
  const getEx = React.useCallback((id) => exercises.find(e => e.id === id), [exercises]);

  const addWorkout = (w) => setWorkouts(prev => [{ id: 'w-new-' + Date.now(), exercises: [], ...w }, ...prev]
    .sort((a, c) => c.date.localeCompare(a.date)));
  const addExercise = (e) => setExercises(prev => [...prev, { id: 'ex-new-' + Date.now(), ...e }]);
  const addBodyWeight = (b) => setBodyWeight(prev => [{ ...b }, ...prev].sort((a, c) => c.entry_date.localeCompare(a.entry_date)));

  return {
    workouts, exercises, bodyWeight, trainingTypes,
    getType, getEx,
    addWorkout, addExercise, addBodyWeight,
  };
}

// Compute aggregations for an exercise across all workouts
function exerciseProgress(exerciseId, workouts) {
  const rows = [];
  for (const w of workouts) {
    for (const we of w.exercises) {
      if (we.exercise_id !== exerciseId) continue;
      const sets = we.sets || [];
      const maxWeight = max(sets.filter(s => s.weight), s => s.weight);
      const volume = sum(sets, s => (s.weight && s.reps) ? s.weight * s.reps : 0);
      const totalReps = sum(sets, s => s.reps || 0);
      const totalDur = sum(sets, s => s.duration_seconds || 0);
      const totalDist = sum(sets, s => s.distance_meters || 0);
      const maxH = max(sets, s => s.height_cm || 0);
      rows.push({
        date: w.date, workout_id: w.id, training_type_id: we.training_type_id,
        sets_count: sets.length,
        max_weight: maxWeight || null,
        volume: volume || null,
        total_reps: totalReps || null,
        total_duration: totalDur || null,
        total_distance: totalDist || null,
        max_height: maxH || null,
      });
    }
  }
  return rows.sort((a, b) => a.date.localeCompare(b.date));
}

// ─── Top bar with large title ────────────────────────────────
function TopBar({ title, subtitle, onBack, action, statusDark }) {
  const t = useTheme();
  return (
    <div style={{ padding: '50px 20px 8px', position: 'relative' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', minHeight: 36, marginBottom: 4 }}>
        {onBack ? (
          <button onClick={onBack} style={{
            background: t.surface, border: 'none', borderRadius: 99,
            width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: t.text, cursor: 'pointer', boxShadow: t.shadowSm,
          }}><Icon name="back" size={18} stroke={2.2} /></button>
        ) : <div style={{ width: 36 }} />}
        {action || <div style={{ width: 36 }} />}
      </div>
      <div style={{ fontSize: 32, fontWeight: 700, color: t.text, letterSpacing: -0.8, lineHeight: 1.08 }}>{title}</div>
      {subtitle && <div style={{ marginTop: 4, fontSize: 14, color: t.textMuted }}>{subtitle}</div>}
    </div>
  );
}

// ─── Tab bar ─────────────────────────────────────────────────
function TabBar({ active, onChange, onNew }) {
  const t = useTheme();
  const tabs = [
    { id: 'home',     label: 'Resumen',    icon: 'home' },
    { id: 'history',  label: 'Historial',  icon: 'list' },
    { id: 'fab',      label: '',           icon: 'plus' },
    { id: 'progress', label: 'Progresión', icon: 'chart' },
    { id: 'more',     label: 'Más',        icon: 'more' },
  ];
  return (
    <div style={{
      position: 'absolute', bottom: 0, left: 0, right: 0,
      paddingBottom: 28, paddingTop: 6,
      background: t.surface,
      borderTop: `0.5px solid ${t.border}`,
      zIndex: 30,
      backdropFilter: 'blur(20px)',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'flex-start', padding: '0 4px' }}>
        {tabs.map(tab => {
          if (tab.id === 'fab') {
            return (
              <button key="fab" onClick={onNew} style={{
                background: t.accent, color: '#fff',
                width: 56, height: 56, borderRadius: 99,
                border: `4px solid ${t.surface}`, marginTop: -22,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 6px 18px rgba(226,106,74,0.4)',
              }}><Icon name="plus" size={26} stroke={2.6} /></button>
            );
          }
          const isActive = tab.id === active;
          return (
            <button key={tab.id} onClick={() => onChange(tab.id)} style={{
              flex: 1, background: 'none', border: 'none', cursor: 'pointer',
              padding: '6px 0 2px',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
              color: isActive ? t.accent : t.textSubtle,
            }}>
              <Icon name={tab.icon} size={22} stroke={isActive ? 2.2 : 1.8} />
              <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: 0.2 }}>{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

Object.assign(window, { useStore, exerciseProgress, TopBar, TabBar });
