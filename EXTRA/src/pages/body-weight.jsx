// Página Peso corporal

function PageBodyWeight({ store, onBack }) {
  const t = useTheme();
  const { bodyWeight, addBodyWeight } = store;
  const [open, setOpen] = React.useState(false);
  const [toast, setToast] = React.useState(null);

  const sorted = [...bodyWeight].sort((a, b) => a.entry_date.localeCompare(b.entry_date));
  const data = sorted.map(b => ({ x: b.entry_date, y: b.weight }));
  const latest = bodyWeight[0];
  const first = sorted[0];
  const delta = latest && first ? (latest.weight - first.weight).toFixed(1) : null;
  const minW = Math.min(...sorted.map(b => b.weight));
  const maxW = Math.max(...sorted.map(b => b.weight));

  return (
    <div style={{ paddingBottom: 110 }}>
      <TopBar
        title="Peso corporal"
        onBack={onBack}
        action={
          <button onClick={() => setOpen(true)} style={{
            background: '#3A82C4', color: '#fff', border: 'none', borderRadius: 99,
            width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', boxShadow: '0 4px 12px rgba(58,130,196,0.3)',
          }}><Icon name="plus" size={20} stroke={2.4} /></button>
        }
      />

      {/* Big number + chart */}
      <div style={{ padding: '4px 16px 12px' }}>
        <Card padding={16}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 0.4, color: t.textMuted, textTransform: 'uppercase' }}>ACTUAL</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginTop: 2 }}>
                <span style={{ fontSize: 40, fontWeight: 700, color: t.text, letterSpacing: -1, fontVariantNumeric: 'tabular-nums', lineHeight: 1 }}>
                  {latest ? latest.weight.toFixed(1) : '—'}
                </span>
                <span style={{ fontSize: 16, fontWeight: 600, color: t.textMuted }}>kg</span>
              </div>
              {delta && (
                <div style={{ marginTop: 4, fontSize: 12, fontWeight: 700, color: parseFloat(delta) < 0 ? t.success : t.textMuted }}>
                  {parseFloat(delta) > 0 ? '+' : ''}{delta} kg desde {fmtDate(first.entry_date)}
                </div>
              )}
            </div>
            <div style={{ textAlign: 'right', fontSize: 11, color: t.textSubtle, fontWeight: 600 }}>
              <div>máx {maxW.toFixed(1)}kg</div>
              <div style={{ marginTop: 2 }}>mín {minW.toFixed(1)}kg</div>
            </div>
          </div>
          <div style={{ marginTop: 12 }}>
            <LineChart data={data} color="#3A82C4" height={140}
              formatY={(v) => `${v.toFixed(1)}`}
              formatX={(iso) => fmtDate(iso).slice(0, 6)} />
          </div>
        </Card>
      </div>

      {/* Historial */}
      <SectionLabel>Historial</SectionLabel>
      <div style={{ padding: '0 16px 24px', display: 'flex', flexDirection: 'column', gap: 6 }}>
        {bodyWeight.map((b, i) => {
          const prev = bodyWeight[i + 1];
          const change = prev ? (b.weight - prev.weight).toFixed(1) : null;
          return (
            <Card key={b.entry_date} padding={14} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{
                width: 36, height: 36, borderRadius: 11,
                background: '#3A82C418', color: '#3A82C4',
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}><Icon name="body" size={18} stroke={2} /></div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: t.text }}>{fmtDate(b.entry_date, { long: true })}</div>
                {b.notes && <div style={{ fontSize: 12, color: t.textMuted, marginTop: 2 }}>{b.notes}</div>}
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 17, fontWeight: 700, color: t.text, fontVariantNumeric: 'tabular-nums' }}>{b.weight.toFixed(1)}<span style={{ fontSize: 12, fontWeight: 600, color: t.textMuted }}>kg</span></div>
                {change && (
                  <div style={{ fontSize: 11, fontWeight: 700, color: parseFloat(change) < 0 ? t.success : (parseFloat(change) > 0 ? '#D94B4B' : t.textMuted), marginTop: 2 }}>
                    {parseFloat(change) > 0 ? '+' : ''}{change}
                  </div>
                )}
              </div>
            </Card>
          );
        })}
      </div>

      <AddWeightSheet
        open={open} onClose={() => setOpen(false)}
        onSave={(b) => { addBodyWeight(b); setOpen(false); setToast('Peso registrado'); }}
      />

      {toast && <Toast message={toast} onDone={() => setToast(null)} />}
    </div>
  );
}

function AddWeightSheet({ open, onClose, onSave }) {
  const t = useTheme();
  const today = new Date('2026-05-10').toISOString().slice(0, 10);
  const [date, setDate] = React.useState(today);
  const [weight, setWeight] = React.useState('');
  const [notes, setNotes] = React.useState('');

  React.useEffect(() => {
    if (open) { setDate(today); setWeight(''); setNotes(''); }
  }, [open]);

  const can = parseFloat(weight) > 0;

  return (
    <Sheet open={open} onClose={onClose} title="Registrar peso" height="68%">
      <div style={{ padding: '8px 20px 24px', display: 'flex', flexDirection: 'column', gap: 16 }}>
        <Field label="Peso (kg)">
          <div style={{
            background: t.surfaceSunken, borderRadius: 14,
            padding: '20px 16px', display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: 6,
          }}>
            <input value={weight} onChange={(e) => setWeight(e.target.value)} inputMode="decimal" placeholder="0.0"
              style={{
                background: 'transparent', border: 'none', outline: 'none',
                fontSize: 44, fontWeight: 700, color: t.text, fontFamily: 'inherit',
                textAlign: 'center', width: 140, padding: 0,
                fontVariantNumeric: 'tabular-nums', letterSpacing: -1,
              }}/>
            <span style={{ fontSize: 18, fontWeight: 600, color: t.textMuted }}>kg</span>
          </div>
        </Field>
        <Field label="Fecha">
          <TextInput value={date} onChange={setDate} type="date" />
        </Field>
        <Field label="Notas (opcional)">
          <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={2}
            placeholder="Ej. después de entrenar, en ayunas…"
            style={{
              width: '100%', background: t.surfaceSunken, border: 'none', outline: 'none',
              borderRadius: 12, padding: '11px 14px', resize: 'none',
              fontSize: 15, color: t.text, fontFamily: 'inherit', boxSizing: 'border-box',
            }}/>
        </Field>
        <Button full disabled={!can} onClick={() => onSave({ entry_date: date, weight: parseFloat(weight), notes: notes.trim() || undefined })}>
          Guardar
        </Button>
      </div>
    </Sheet>
  );
}

window.PageBodyWeight = PageBodyWeight;
