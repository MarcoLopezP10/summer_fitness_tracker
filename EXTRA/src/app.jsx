// Main App — navigation orchestrator

function App() {
  const store = useStore();

  // Tweaks state — only dark/light
  const [tweaks, setTweak] = useTweaks(/*EDITMODE-BEGIN*/{
    "dark": false
  }/*EDITMODE-END*/);
  const theme = tweaks.dark ? THEME.dark : THEME.light;

  // Navigation stack
  const [stack, setStack] = React.useState([{ page: 'home' }]);
  const [activeTab, setActiveTab] = React.useState('home');
  const [toast, setToast] = React.useState(null);

  const current = stack[stack.length - 1];

  const navigate = (page, ctx = {}) => {
    setStack([{ page, ctx }]);
    if (['home', 'history', 'progress', 'more'].includes(page)) setActiveTab(page);
  };
  const push = (page, ctx = {}) => setStack(prev => [...prev, { page, ctx }]);
  const back = () => {
    setStack(prev => prev.length > 1 ? prev.slice(0, -1) : prev);
  };

  const openWorkout = (id) => push('workout-detail', { workoutId: id });
  const showToast = (msg) => setToast(msg);

  const onTab = (tab) => navigate(tab);
  const onNew = () => push('new-workout');

  let pageEl;
  switch (current.page) {
    case 'home':
      pageEl = <PageHome store={store} onNav={navigate} onOpenWorkout={openWorkout} />;
      break;
    case 'history':
      pageEl = <PageHistory store={store} onOpenWorkout={openWorkout} />;
      break;
    case 'workout-detail':
      pageEl = <PageWorkoutDetail store={store} workoutId={current.ctx.workoutId} onBack={back} />;
      break;
    case 'new-workout':
      pageEl = <PageNewWorkout store={store} onBack={back}
        onSaved={() => { back(); showToast('Entrenamiento guardado'); navigate('history'); }} />;
      break;
    case 'exercises':
      pageEl = <PageExercises store={store} onBack={back} onPickForProgress={(id) => push('progress', { exerciseId: id })} />;
      break;
    case 'progress':
      pageEl = <PageProgress store={store} onBack={current.ctx.exerciseId ? back : undefined} initialExerciseId={current.ctx.exerciseId} />;
      break;
    case 'body-weight':
      pageEl = <PageBodyWeight store={store} onBack={back} />;
      break;
    case 'more':
      pageEl = <PageMore store={store} onNav={(p) => push(p)} />;
      break;
    case 'settings':
      pageEl = <PageSettings store={store} onBack={back} />;
      break;
    default:
      pageEl = <div>404</div>;
  }

  return (
    <ThemeContext.Provider value={theme}>
      <div style={{
        height: '100%', width: '100%',
        background: theme.bg, color: theme.text,
        position: 'relative', overflow: 'hidden',
        fontFamily: '-apple-system, "SF Pro Text", system-ui, sans-serif',
        WebkitFontSmoothing: 'antialiased',
        colorScheme: theme.name,
      }}>
        <div style={{
          height: '100%', width: '100%', overflow: 'auto',
          WebkitOverflowScrolling: 'touch',
        }}>
          {pageEl}
        </div>

        <TabBar active={activeTab} onChange={onTab} onNew={onNew} />

        {toast && <Toast message={toast} onDone={() => setToast(null)} />}

        <TweaksPanel title="Tweaks">
          <TweakSection label="Apariencia">
            <TweakToggle label="Modo oscuro" value={tweaks.dark} onChange={(v) => setTweak('dark', v)} />
          </TweakSection>
        </TweaksPanel>
      </div>
    </ThemeContext.Provider>
  );
}

window.App = App;
