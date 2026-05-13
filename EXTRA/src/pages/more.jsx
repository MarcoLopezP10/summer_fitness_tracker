// Páginas Más + Configuración

function PageMore({ store, onNav, onBack }) {
  const t = useTheme();
  const { workouts, exercises, bodyWeight } = store;

  const items = [
    { id: 'exercises', label: 'Ejercicios', icon: 'dumbbell', color: '#3DA37A', desc: `${exercises.length} en catálogo` },
    { id: 'body-weight', label: 'Peso corporal', icon: 'body', color: '#3A82C4', desc: `${bodyWeight.length} registros` },
    { id: 'progress', label: 'Progresión', icon: 'chart', color: '#7B5CD6', desc: 'Evolución por ejercicio' },
    { id: 'settings', label: 'Configuración', icon: 'settings', color: '#8A8378', desc: 'Tipos, info, ajustes' },
  ];

  return (
    <div style={{ paddingBottom: 110 }}>
      <TopBar title="Más" subtitle={`${workouts.length} entrenamientos · ${exercises.length} ejercicios`} />

      <div style={{ padding: '4px 16px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        {items.map(item => (
          <Card key={item.id} onClick={() => onNav(item.id)} padding={14} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 40, height: 40, borderRadius: 12,
              background: item.color + '18', color: item.color,
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}><Icon name={item.icon} size={20} stroke={1.9} /></div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 15, fontWeight: 600, color: t.text }}>{item.label}</div>
              <div style={{ fontSize: 12, color: t.textMuted, marginTop: 2 }}>{item.desc}</div>
            </div>
            <Icon name="chev" size={16} color={t.textSubtle} stroke={2.2} />
          </Card>
        ))}
      </div>

      {/* Brand footer */}
      <div style={{ textAlign: 'center', padding: '40px 16px 24px' }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: t.text, letterSpacing: -0.2 }}>fitness_tracker</div>
        <div style={{ fontSize: 11, color: t.textSubtle, marginTop: 4 }}>v0.1 · prototipo</div>
      </div>
    </div>
  );
}

function PageSettings({ store, onBack }) {
  const t = useTheme();
  const { trainingTypes, workouts, exercises, bodyWeight } = store;

  return (
    <div style={{ paddingBottom: 110 }}>
      <TopBar title="Configuración" onBack={onBack} />

      <SectionLabel>Sobre el proyecto</SectionLabel>
      <div style={{ padding: '0 16px 12px' }}>
        <Card padding={16}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
            <div style={{
              width: 44, height: 44, borderRadius: 12,
              background: t.accentSoft, color: t.accent,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}><Icon name="flame" size={22} stroke={1.8} /></div>
            <div>
              <div style={{ fontSize: 17, fontWeight: 700, color: t.text }}>fitness_tracker</div>
              <div style={{ fontSize: 12, color: t.textMuted }}>App personal de seguimiento</div>
            </div>
          </div>
          <div style={{ fontSize: 13, color: t.textMuted, lineHeight: 1.5 }}>
            Registra entrenamientos por tipo (pliometría, potencia, fuerza, hipertrofia u otro), series con métricas flexibles y la evolución de tu peso corporal.
          </div>
        </Card>
      </div>

      <SectionLabel>Tipos de entrenamiento</SectionLabel>
      <div style={{ padding: '0 16px 12px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        {trainingTypes.map(tt => (
          <Card key={tt.id} padding={14}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
              <div style={{ width: 4, height: 36, borderRadius: 99, background: tt.color, flexShrink: 0, marginTop: 2 }} />
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 15, fontWeight: 700, color: t.text }}>{tt.name}</span>
                </div>
                <div style={{ fontSize: 13, color: t.textMuted, marginTop: 4, lineHeight: 1.45 }}>{tt.desc}</div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <SectionLabel>Datos</SectionLabel>
      <div style={{ padding: '0 16px 12px' }}>
        <Card padding={0}>
          <SettingsRow label="Entrenamientos" value={workouts.length} />
          <SettingsRow label="Ejercicios" value={exercises.length} />
          <SettingsRow label="Registros de peso" value={bodyWeight.length} />
          <SettingsRow label="Total series" value={sum(workouts, w => sum(w.exercises, e => e.sets.length))} last />
        </Card>
      </div>

      <SectionLabel>Stack</SectionLabel>
      <div style={{ padding: '0 16px 32px' }}>
        <Card padding={0}>
          <SettingsRow label="Backend" value="Supabase / PostgreSQL" />
          <SettingsRow label="Frontend" value="Streamlit" />
          <SettingsRow label="Gráficas" value="Plotly" />
          <SettingsRow label="Datos" value="Pandas" last />
        </Card>
      </div>
    </div>
  );
}

function SettingsRow({ label, value, last }) {
  const t = useTheme();
  return (
    <div style={{
      padding: '12px 16px',
      borderBottom: last ? 'none' : `1px solid ${t.border}`,
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    }}>
      <span style={{ fontSize: 14, color: t.text, fontWeight: 500 }}>{label}</span>
      <span style={{ fontSize: 14, color: t.textMuted, fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>{value}</span>
    </div>
  );
}

window.PageMore = PageMore;
window.PageSettings = PageSettings;
