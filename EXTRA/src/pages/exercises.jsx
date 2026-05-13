// Página Ejercicios

function PageExercises({ store, onBack, onPickForProgress }) {
  const t = useTheme();
  const { exercises, trainingTypes, workouts, getType, addExercise } = store;
  const [filter, setFilter] = React.useState(null);
  const [q, setQ] = React.useState('');
  const [createOpen, setCreateOpen] = React.useState(false);

  const filtered = exercises.filter(ex => {
    if (q && !ex.name.toLowerCase().includes(q.toLowerCase())) return false;
    if (filter === 'none' && ex.default_type) return false;
    else if (filter && filter !== 'none' && ex.default_type !== filter) return false;
    return true;
  });

  // count uses
  const uses = React.useMemo(() => {
    const m = {};
    for (const w of workouts) for (const we of w.exercises) m[we.exercise_id] = (m[we.exercise_id] || 0) + 1;
    return m;
  }, [workouts]);

  return (
    <div style={{ paddingBottom: 110 }}>
      <TopBar
        title="Ejercicios"
        subtitle={`${exercises.length} en tu catálogo`}
        onBack={onBack}
        action={
          <button onClick={() => setCreateOpen(true)} style={{
            background: t.accent, color: '#fff',
            border: 'none', borderRadius: 99,
            width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', boxShadow: '0 4px 12px rgba(226,106,74,0.3)',
          }}><Icon name="plus" size={20} stroke={2.4} /></button>
        }
      />

      {/* Search + filter */}
      <div style={{ padding: '4px 16px 12px' }}>
        <div style={{
          background: t.surface, borderRadius: 12,
          padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 8,
          boxShadow: t.shadowSm,
        }}>
          <Icon name="search" size={18} color={t.textMuted} stroke={2} />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar ejercicio"
            style={{
              flex: 1, background: 'transparent', border: 'none', outline: 'none',
              fontSize: 15, color: t.text, fontFamily: 'inherit',
            }}/>
        </div>
      </div>

      <div style={{ padding: '0 16px 12px', display: 'flex', gap: 6, overflow: 'auto' }}>
        <FilterChip active={!filter} onClick={() => setFilter(null)}>Todos</FilterChip>
        {trainingTypes.map(tt => (
          <FilterChip key={tt.id} active={filter === tt.id} color={tt.color} onClick={() => setFilter(filter === tt.id ? null : tt.id)}>
            {tt.name}
          </FilterChip>
        ))}
        <FilterChip active={filter === 'none'} onClick={() => setFilter(filter === 'none' ? null : 'none')}>Sin tipo</FilterChip>
      </div>

      <div style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        {filtered.map(ex => {
          const ty = ex.default_type ? getType(ex.default_type) : null;
          return (
            <Card key={ex.id} padding={12} onClick={() => onPickForProgress && onPickForProgress(ex.id)}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{
                  width: 38, height: 38, borderRadius: 11,
                  background: ty ? ty.color + '1A' : t.surfaceSunken,
                  color: ty ? ty.color : t.textMuted,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}>
                  <Icon name="dumbbell" size={18} stroke={2} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 15, fontWeight: 600, color: t.text, lineHeight: 1.2 }}>{ex.name}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4, flexWrap: 'wrap' }}>
                    {ty ? <TypePill type={ty} size="sm" /> : <span style={{ fontSize: 11, color: t.textSubtle, fontStyle: 'italic' }}>sin tipo por defecto</span>}
                    {uses[ex.id] > 0 && (
                      <span style={{ fontSize: 11, color: t.textMuted, fontWeight: 600 }}>· {uses[ex.id]} usos</span>
                    )}
                  </div>
                </div>
                <Icon name="chev" size={14} color={t.textSubtle} stroke={2.2} />
              </div>
            </Card>
          );
        })}
        {filtered.length === 0 && <Empty icon="search" title="No hay ejercicios" subtitle="Cambia el filtro o crea uno nuevo." action="Crear ejercicio" onAction={() => setCreateOpen(true)} />}
      </div>

      <CreateExerciseSheet
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        trainingTypes={trainingTypes}
        onCreate={(data) => { addExercise(data); setCreateOpen(false); }}
      />
    </div>
  );
}

function CreateExerciseSheet({ open, onClose, trainingTypes, onCreate }) {
  const t = useTheme();
  const [name, setName] = React.useState('');
  const [typeId, setTypeId] = React.useState(null);
  const [notes, setNotes] = React.useState('');

  React.useEffect(() => {
    if (open) { setName(''); setTypeId(null); setNotes(''); }
  }, [open]);

  const canCreate = name.trim().length > 0;

  return (
    <Sheet open={open} onClose={onClose} title="Nuevo ejercicio" height="75%">
      <div style={{ padding: '8px 20px 20px', display: 'flex', flexDirection: 'column', gap: 16 }}>
        <Field label="Nombre">
          <TextInput value={name} onChange={setName} placeholder="Ej. Sentadilla frontal" />
        </Field>

        <Field label="Tipo por defecto" hint="Opcional. Podrás elegir otro tipo en cada entrenamiento.">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            <button onClick={() => setTypeId(null)} style={{
              background: !typeId ? t.text : t.surfaceSunken,
              color: !typeId ? t.surface : t.textMuted,
              border: 'none', borderRadius: 99,
              padding: '7px 12px', fontSize: 12, fontWeight: 600,
              cursor: 'pointer', fontFamily: 'inherit',
            }}>Sin tipo</button>
            {trainingTypes.map(tt => {
              const active = tt.id === typeId;
              return (
                <button key={tt.id} onClick={() => setTypeId(tt.id)} style={{
                  background: active ? tt.color : tt.color + '14',
                  color: active ? '#fff' : tt.color,
                  border: 'none', borderRadius: 99,
                  padding: '7px 12px', fontSize: 12, fontWeight: 600,
                  cursor: 'pointer', fontFamily: 'inherit',
                }}>{tt.name}</button>
              );
            })}
          </div>
        </Field>

        <Field label="Notas">
          <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={3}
            placeholder="Cómo ejecutarlo, variantes, recordatorios…"
            style={{
              width: '100%', background: t.surfaceSunken, border: 'none', outline: 'none',
              borderRadius: 12, padding: '11px 14px', resize: 'none',
              fontSize: 15, color: t.text, fontFamily: 'inherit',
              boxSizing: 'border-box',
            }}/>
        </Field>

        <Button full disabled={!canCreate} onClick={() => onCreate({ name: name.trim(), default_type: typeId, notes: notes.trim() })}>
          Crear ejercicio
        </Button>
      </div>
    </Sheet>
  );
}

window.PageExercises = PageExercises;
