// Página Nuevo Entrenamiento — flujo principal

function PageNewWorkout({ store, onBack, onSaved }) {
  const t = useTheme();
  const { exercises, trainingTypes, getEx, getType, addWorkout } = store;

  const today = new Date('2026-05-10').toISOString().slice(0, 10);
  const [name, setName] = React.useState('');
  const [date, setDate] = React.useState(today);
  const [notes, setNotes] = React.useState('');
  const [showNotes, setShowNotes] = React.useState(false);
  const [items, setItems] = React.useState([]); // [{exercise_id, training_type_id, notes, sets:[...]}]
  const [pickerOpen, setPickerOpen] = React.useState(false);

  const totalSets = sum(items, it => it.sets.length);
  const totalVolume = sum(items.flatMap(it => it.sets), s => (s.weight && s.reps) ? s.weight * s.reps : 0);

  const addExerciseToWorkout = (ex) => {
    setItems(prev => [...prev, {
      exercise_id: ex.id,
      training_type_id: ex.default_type || 'tt-otr',
      notes: '',
      sets: [{ set_number: 1 }],
    }]);
    setPickerOpen(false);
  };

  const updateItem = (idx, fn) => setItems(prev => prev.map((it, i) => i === idx ? fn(it) : it));
  const removeItem = (idx) => setItems(prev => prev.filter((_, i) => i !== idx));

  const addSet = (idx) => updateItem(idx, it => {
    const last = it.sets[it.sets.length - 1] || {};
    return { ...it, sets: [...it.sets, {
      set_number: it.sets.length + 1,
      // copy hints from last set
      weight: last.weight, reps: last.reps,
    }]};
  });

  const updateSet = (itemIdx, setIdx, patch) => updateItem(itemIdx, it => ({
    ...it,
    sets: it.sets.map((s, i) => i === setIdx ? { ...s, ...patch } : s),
  }));

  const removeSet = (itemIdx, setIdx) => updateItem(itemIdx, it => ({
    ...it,
    sets: it.sets.filter((_, i) => i !== setIdx).map((s, i) => ({ ...s, set_number: i + 1 })),
  }));

  const canSave = name.trim() && items.length > 0 && items.every(it => it.sets.length > 0);

  const handleSave = () => {
    if (!canSave) return;
    addWorkout({
      date,
      name: name.trim(),
      notes: notes.trim() || undefined,
      exercises: items,
    });
    onSaved && onSaved();
  };

  return (
    <div style={{ paddingBottom: 140 }}>
      <TopBar
        title="Nuevo entrenamiento"
        onBack={onBack}
        action={
          <button onClick={handleSave} disabled={!canSave} style={{
            background: canSave ? t.accent : t.surfaceSunken,
            color: canSave ? '#fff' : t.textSubtle,
            border: 'none', borderRadius: 99,
            padding: '8px 16px', fontSize: 14, fontWeight: 700,
            cursor: canSave ? 'pointer' : 'not-allowed',
            fontFamily: 'inherit',
          }}>Guardar</button>
        }
      />

      {/* Form básico */}
      <div style={{ padding: '4px 16px 12px' }}>
        <Card padding={0}>
          <div style={{ padding: '14px 16px 12px', display: 'flex', flexDirection: 'column', gap: 12 }}>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nombre del entrenamiento"
              style={{
                background: 'transparent', border: 'none', outline: 'none',
                fontSize: 20, fontWeight: 700, color: t.text,
                fontFamily: 'inherit', letterSpacing: -0.3,
                padding: 0, width: '100%',
              }}
            />
            <div style={{ display: 'flex', gap: 8 }}>
              {['Pierna — fuerza', 'Empuje', 'Tirón', 'Salto + potencia'].slice(0, 3).map(suggest => (
                <button key={suggest} onClick={() => setName(suggest)} style={{
                  background: t.surfaceSunken, border: 'none', borderRadius: 99,
                  padding: '5px 10px', fontSize: 11, fontWeight: 600,
                  color: t.textMuted, cursor: 'pointer', fontFamily: 'inherit',
                }}>{suggest}</button>
              ))}
            </div>
          </div>
          <div style={{ height: 1, background: t.border }} />
          <div style={{ padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 10 }}>
            <Icon name="calendar" size={18} color={t.textMuted} stroke={1.8} />
            <input
              type="date" value={date} onChange={(e) => setDate(e.target.value)}
              style={{
                flex: 1, background: 'transparent', border: 'none', outline: 'none',
                fontSize: 15, fontWeight: 600, color: t.text, fontFamily: 'inherit',
              }}
            />
            <span style={{ fontSize: 13, color: t.textMuted }}>{relativeDay(date)}</span>
          </div>
          <div style={{ height: 1, background: t.border }} />
          {showNotes ? (
            <div style={{ padding: '10px 16px' }}>
              <textarea
                value={notes} onChange={(e) => setNotes(e.target.value)}
                placeholder="Notas del entrenamiento…"
                rows={2}
                style={{
                  width: '100%', background: 'transparent', border: 'none', outline: 'none',
                  fontSize: 14, color: t.text, fontFamily: 'inherit', resize: 'none',
                  padding: 0,
                }}
              />
            </div>
          ) : (
            <button onClick={() => setShowNotes(true)} style={{
              width: '100%', padding: '10px 16px', textAlign: 'left',
              background: 'none', border: 'none', cursor: 'pointer',
              fontSize: 14, fontWeight: 500, color: t.textMuted, fontFamily: 'inherit',
              display: 'flex', alignItems: 'center', gap: 8,
            }}>
              <Icon name="plusSm" size={16} /> Añadir notas
            </button>
          )}
        </Card>
      </div>

      {/* Resumen sticky */}
      {items.length > 0 && (
        <div style={{ padding: '0 16px 8px', display: 'flex', gap: 8 }}>
          <SummaryPill label="Ejercicios" value={items.length} />
          <SummaryPill label="Series" value={totalSets} />
          {totalVolume > 0 && <SummaryPill label="Volumen" value={`${(totalVolume / 1000).toFixed(1)}t`} />}
        </div>
      )}

      {/* Items */}
      <div style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {items.map((item, idx) => (
          <WorkoutItem
            key={idx} idx={idx} item={item}
            getEx={getEx} getType={getType} trainingTypes={trainingTypes}
            onChangeType={(typeId) => updateItem(idx, it => ({ ...it, training_type_id: typeId }))}
            onChangeNotes={(n) => updateItem(idx, it => ({ ...it, notes: n }))}
            onRemove={() => removeItem(idx)}
            onAddSet={() => addSet(idx)}
            onUpdateSet={(sIdx, patch) => updateSet(idx, sIdx, patch)}
            onRemoveSet={(sIdx) => removeSet(idx, sIdx)}
          />
        ))}
      </div>

      {/* Add exercise button */}
      <div style={{ padding: '14px 16px' }}>
        <button onClick={() => setPickerOpen(true)} style={{
          width: '100%', padding: '14px',
          background: t.surface, color: t.accent,
          border: `1.5px dashed ${t.accent}55`,
          borderRadius: 16, cursor: 'pointer',
          fontSize: 15, fontWeight: 600, fontFamily: 'inherit',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        }}>
          <Icon name="plus" size={18} stroke={2.4} />
          Añadir ejercicio
        </button>
      </div>

      <ExercisePicker
        open={pickerOpen}
        onClose={() => setPickerOpen(false)}
        exercises={exercises} trainingTypes={trainingTypes} getType={getType}
        onPick={addExerciseToWorkout}
      />
    </div>
  );
}

function SummaryPill({ label, value }) {
  const t = useTheme();
  return (
    <div style={{
      flex: 1, background: t.surface, borderRadius: 12,
      padding: '8px 12px', boxShadow: t.shadowSm,
      display: 'flex', flexDirection: 'column', gap: 0,
    }}>
      <span style={{ fontSize: 10, fontWeight: 600, color: t.textMuted, letterSpacing: 0.4, textTransform: 'uppercase' }}>{label}</span>
      <span style={{ fontSize: 16, fontWeight: 700, color: t.text, fontVariantNumeric: 'tabular-nums' }}>{value}</span>
    </div>
  );
}

// ─── Item del entrenamiento ──────────────────────────────────
function WorkoutItem({ idx, item, getEx, getType, trainingTypes, onChangeType, onChangeNotes, onRemove, onAddSet, onUpdateSet, onRemoveSet }) {
  const t = useTheme();
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [typeOpen, setTypeOpen] = React.useState(false);
  const ex = getEx(item.exercise_id);
  const currentType = getType(item.training_type_id);

  return (
    <Card padding={0}>
      {/* Header */}
      <div style={{ padding: '14px 16px 10px', display: 'flex', alignItems: 'flex-start', gap: 10 }}>
        <div style={{
          width: 30, height: 30, borderRadius: 8, background: currentType.color + '20',
          color: currentType.color, display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 12, fontWeight: 700, flexShrink: 0,
        }}>{idx + 1}</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 16, fontWeight: 700, color: t.text, lineHeight: 1.2 }}>{ex?.name}</div>
          <button onClick={() => setTypeOpen(true)} style={{
            background: 'none', border: 'none', padding: '4px 0 0', cursor: 'pointer', display: 'flex',
          }}>
            <TypePill type={currentType} size="sm" />
            <span style={{ marginLeft: 4, color: t.textSubtle, display: 'flex', alignItems: 'center' }}>
              <Icon name="chevDn" size={12} stroke={2.5} />
            </span>
          </button>
        </div>
        <button onClick={onRemove} style={{
          background: 'none', border: 'none', cursor: 'pointer', padding: 4,
          color: t.textSubtle,
        }}><Icon name="close" size={18} /></button>
      </div>

      {/* Type picker dropdown */}
      {typeOpen && (
        <div style={{ padding: '0 16px 10px', display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {trainingTypes.map(tt => {
            const active = tt.id === item.training_type_id;
            return (
              <button key={tt.id} onClick={() => { onChangeType(tt.id); setTypeOpen(false); }} style={{
                background: active ? tt.color : tt.color + '14',
                color: active ? '#fff' : tt.color,
                border: 'none', borderRadius: 99,
                padding: '6px 12px', fontSize: 12, fontWeight: 600,
                cursor: 'pointer', fontFamily: 'inherit',
              }}>{tt.name}</button>
            );
          })}
        </div>
      )}

      {/* Series header */}
      <div style={{
        display: 'grid', gridTemplateColumns: '32px 1fr 1fr 28px',
        gap: 8, padding: '8px 16px 6px',
        fontSize: 10, fontWeight: 700, letterSpacing: 0.6, color: t.textSubtle, textTransform: 'uppercase',
      }}>
        <div>#</div>
        <div>Peso</div>
        <div>Reps</div>
        <div></div>
      </div>

      {/* Series */}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {item.sets.map((set, sIdx) => (
          <SetRow
            key={sIdx} set={set} number={sIdx + 1}
            onUpdate={(patch) => onUpdateSet(sIdx, patch)}
            onRemove={() => onRemoveSet(sIdx)}
          />
        ))}
      </div>

      {/* Add set */}
      <button onClick={onAddSet} style={{
        width: '100%', padding: '12px 16px',
        background: 'none', border: 'none', borderTop: `1px solid ${t.border}`,
        cursor: 'pointer',
        fontSize: 13, fontWeight: 600, color: t.accent, fontFamily: 'inherit',
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
      }}>
        <Icon name="plusSm" size={14} stroke={2.4} />
        Añadir serie
      </button>
    </Card>
  );
}

// ─── Set Row ─────────────────────────────────────────────────
function SetRow({ set, number, onUpdate, onRemove }) {
  const t = useTheme();
  const [expanded, setExpanded] = React.useState(false);

  const isComplete = (set.weight && set.reps) || set.duration_seconds || set.distance_meters || set.height_cm;

  return (
    <div style={{
      borderTop: `1px solid ${t.border}`,
      background: isComplete ? 'transparent' : 'transparent',
    }}>
      <div style={{
        display: 'grid', gridTemplateColumns: '32px 1fr 1fr 28px',
        gap: 8, padding: '8px 16px', alignItems: 'center',
      }}>
        <div style={{
          width: 26, height: 26, borderRadius: 99,
          background: isComplete ? t.success + '20' : t.surfaceSunken,
          color: isComplete ? t.success : t.textMuted,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 12, fontWeight: 700,
        }}>{number}</div>
        <NumberCell value={set.weight} onChange={(v) => onUpdate({ weight: v })} unit="kg" />
        <NumberCell value={set.reps} onChange={(v) => onUpdate({ reps: v })} integer />
        <button onClick={() => setExpanded(e => !e)} style={{
          background: expanded ? t.accentSoft : 'transparent', border: 'none', cursor: 'pointer',
          width: 28, height: 28, borderRadius: 99,
          color: expanded ? t.accent : t.textMuted,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Icon name={expanded ? 'chevDn' : 'more'} size={16} stroke={2.2} />
        </button>
      </div>
      {expanded && (
        <div style={{
          padding: '0 16px 12px', display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr', gap: 8,
        }}>
          <ExtraCell label="DURACIÓN" value={set.duration_seconds} onChange={(v) => onUpdate({ duration_seconds: v })} unit="s" />
          <ExtraCell label="DISTANCIA" value={set.distance_meters} onChange={(v) => onUpdate({ distance_meters: v })} unit="m" />
          <ExtraCell label="ALTURA" value={set.height_cm} onChange={(v) => onUpdate({ height_cm: v })} unit="cm" />
          <div style={{ gridColumn: '1 / -1', display: 'flex', gap: 8 }}>
            <input
              value={set.intensity_notes || ''}
              onChange={(e) => onUpdate({ intensity_notes: e.target.value })}
              placeholder="Intensidad (ej. rápido, PR)"
              style={{
                flex: 1, background: t.surfaceSunken, border: 'none', outline: 'none',
                borderRadius: 10, padding: '8px 12px',
                fontSize: 13, color: t.text, fontFamily: 'inherit',
              }}
            />
            <button onClick={onRemove} style={{
              background: 'none', border: 'none', color: '#D94B4B',
              fontSize: 12, fontWeight: 600, fontFamily: 'inherit', cursor: 'pointer',
              padding: '0 4px',
            }}>Eliminar</button>
          </div>
        </div>
      )}
    </div>
  );
}

function NumberCell({ value, onChange, unit, integer }) {
  const t = useTheme();
  return (
    <div style={{
      background: t.surfaceSunken, borderRadius: 10,
      padding: '8px 10px', display: 'flex', alignItems: 'baseline', gap: 4,
    }}>
      <input
        value={value ?? ''}
        onChange={(e) => {
          const v = e.target.value;
          if (v === '') return onChange(undefined);
          const parsed = integer ? parseInt(v, 10) : parseFloat(v);
          if (!isNaN(parsed)) onChange(parsed);
        }}
        inputMode="decimal"
        placeholder="—"
        style={{
          flex: 1, background: 'transparent', border: 'none', outline: 'none',
          fontSize: 15, fontWeight: 600, color: t.text, fontFamily: 'inherit',
          minWidth: 0, padding: 0, fontVariantNumeric: 'tabular-nums',
        }}
      />
      {unit && <span style={{ fontSize: 11, fontWeight: 600, color: t.textSubtle }}>{unit}</span>}
    </div>
  );
}

function ExtraCell({ label, value, onChange, unit }) {
  const t = useTheme();
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <span style={{ fontSize: 9, fontWeight: 700, color: t.textSubtle, letterSpacing: 0.5 }}>{label}</span>
      <NumberCell value={value} onChange={onChange} unit={unit} />
    </div>
  );
}

// ─── Exercise picker sheet ───────────────────────────────────
function ExercisePicker({ open, onClose, exercises, trainingTypes, getType, onPick }) {
  const t = useTheme();
  const [q, setQ] = React.useState('');
  const [filter, setFilter] = React.useState(null);

  const filtered = exercises.filter(ex => {
    if (q && !ex.name.toLowerCase().includes(q.toLowerCase())) return false;
    if (filter && ex.default_type !== filter) return false;
    return true;
  });

  return (
    <Sheet open={open} onClose={onClose} title="Añadir ejercicio" height="80%">
      <div style={{ padding: '8px 20px 12px' }}>
        <div style={{
          background: t.surfaceSunken, borderRadius: 12,
          padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 8,
        }}>
          <Icon name="search" size={18} color={t.textMuted} stroke={2} />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar ejercicio"
            style={{
              flex: 1, background: 'transparent', border: 'none', outline: 'none',
              fontSize: 15, color: t.text, fontFamily: 'inherit',
            }}/>
        </div>
        <div style={{ display: 'flex', gap: 6, overflow: 'auto', marginTop: 10, paddingBottom: 4 }}>
          <FilterChip active={!filter} onClick={() => setFilter(null)}>Todos</FilterChip>
          {trainingTypes.map(tt => (
            <FilterChip key={tt.id} active={filter === tt.id} color={tt.color} onClick={() => setFilter(filter === tt.id ? null : tt.id)}>
              {tt.name}
            </FilterChip>
          ))}
        </div>
      </div>
      <div style={{ padding: '0 16px 24px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        {filtered.map(ex => {
          const ty = getType(ex.default_type);
          return (
            <button key={ex.id} onClick={() => onPick(ex)} style={{
              background: t.surfaceAlt, border: 'none', borderRadius: 14,
              padding: '12px 14px', cursor: 'pointer', fontFamily: 'inherit',
              display: 'flex', alignItems: 'center', gap: 12, textAlign: 'left',
            }}>
              <div style={{
                width: 36, height: 36, borderRadius: 10,
                background: ty?.color + '20', color: ty?.color,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}><Icon name="dumbbell" size={18} stroke={2} /></div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 15, fontWeight: 600, color: t.text }}>{ex.name}</div>
                {ty && <div style={{ marginTop: 3 }}><TypePill type={ty} size="sm" /></div>}
              </div>
              <Icon name="plus" size={20} color={t.accent} stroke={2.4} />
            </button>
          );
        })}
        {filtered.length === 0 && (
          <Empty icon="search" title="Sin resultados" subtitle="Prueba con otra búsqueda o crea un ejercicio nuevo." />
        )}
      </div>
    </Sheet>
  );
}

function FilterChip({ children, active, color, onClick }) {
  const t = useTheme();
  return (
    <button onClick={onClick} style={{
      background: active ? (color || t.text) : t.surfaceSunken,
      color: active ? '#fff' : t.textMuted,
      border: 'none', borderRadius: 99,
      padding: '6px 12px', fontSize: 12, fontWeight: 600,
      cursor: 'pointer', fontFamily: 'inherit',
      whiteSpace: 'nowrap', flexShrink: 0,
    }}>{children}</button>
  );
}

window.PageNewWorkout = PageNewWorkout;
