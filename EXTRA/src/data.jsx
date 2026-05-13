// Datos semilla para fitness_tracker — ~8 semanas de historial realista

const TRAINING_TYPES = [
  { id: 'tt-pli', name: 'Pliometría', short: 'Plio', color: '#7B5CD6', desc: 'Saltos, multisaltos, lanzamientos, acciones reactivas. Con o sin peso.' },
  { id: 'tt-pot', name: 'Potencia',   short: 'Pot',  color: '#E68A2E', desc: 'Mover carga o cuerpo a máxima velocidad posible.' },
  { id: 'tt-fue', name: 'Fuerza',     short: 'Fue',  color: '#D94B4B', desc: 'Maximizar la carga levantada.' },
  { id: 'tt-hip', name: 'Hipertrofia',short: 'Hip',  color: '#3A82C4', desc: 'Aumentar tamaño muscular con volumen y tensión.' },
  { id: 'tt-otr', name: 'Otro',       short: 'Otr',  color: '#8A8378', desc: 'Genérico para ejercicios sin categoría clara.' },
];

const EXERCISES = [
  { id: 'ex-sq',   name: 'Sentadilla',          default_type: 'tt-fue', notes: 'Barra trasera. Profundidad paralela.' },
  { id: 'ex-bp',   name: 'Press banca',         default_type: 'tt-fue', notes: 'Pies anclados, escápulas retraídas.' },
  { id: 'ex-dl',   name: 'Peso muerto',         default_type: 'tt-fue', notes: 'Convencional.' },
  { id: 'ex-jsq',  name: 'Sentadilla con salto',default_type: 'tt-pli', notes: 'Triple extensión, aterrizaje suave.' },
  { id: 'ex-box',  name: 'Salto al cajón',      default_type: 'tt-pli', notes: 'Cajón 60-70cm.' },
  { id: 'ex-mtj',  name: 'Multisaltos',         default_type: 'tt-pli', notes: '10 saltos consecutivos sobre vallas.' },
  { id: 'ex-pcl',  name: 'Power clean',         default_type: 'tt-pot', notes: 'Foco en velocidad de extensión.' },
  { id: 'ex-pp',   name: 'Push press',          default_type: 'tt-pot', notes: 'Dip-drive explosivo.' },
  { id: 'ex-bsq',  name: 'Sentadilla búlgara',  default_type: 'tt-hip', notes: 'Mancuernas, pierna trasera elevada.' },
  { id: 'ex-pu',   name: 'Dominadas',           default_type: 'tt-hip', notes: 'Agarre prono, rom completo.' },
  { id: 'ex-cb',   name: 'Curl bíceps',         default_type: 'tt-hip', notes: 'Barra Z, control excéntrico.' },
  { id: 'ex-spr',  name: 'Sprint 30m',          default_type: 'tt-otr', notes: 'Salida de pie. Cronómetro manual.' },
];

// 8 semanas de entrenamientos — fechas relativas al "hoy" del prototipo (10 may 2026)
// formato: { id, date, name, notes, exercises: [{exercise_id, training_type_id, notes, sets: [...] }] }

function __seedDate(daysAgo) {
  // Construct UTC date to avoid timezone offset shifting the ISO date
  const t = new Date(Date.UTC(2026, 4, 10));
  t.setUTCDate(t.getUTCDate() - daysAgo);
  return t.toISOString().slice(0, 10);
}
const d = __seedDate;

const WORKOUTS = [
  { id: 'w-12', date: d(56), name: 'Pierna — base', notes: 'Inicio del bloque.', exercises: [
    { exercise_id: 'ex-sq', training_type_id: 'tt-fue', notes: '', sets: [
      { set_number:1, weight:80, reps:5 }, { set_number:2, weight:90, reps:5 }, { set_number:3, weight:100, reps:5 }, { set_number:4, weight:100, reps:5 },
    ]},
    { exercise_id: 'ex-bsq', training_type_id: 'tt-hip', notes: '', sets: [
      { set_number:1, weight:20, reps:10 }, { set_number:2, weight:22.5, reps:10 }, { set_number:3, weight:22.5, reps:10 },
    ]},
  ]},
  { id: 'w-11', date: d(53), name: 'Empuje', notes: '', exercises: [
    { exercise_id: 'ex-bp', training_type_id: 'tt-fue', notes: '', sets: [
      { set_number:1, weight:60, reps:5 }, { set_number:2, weight:70, reps:5 }, { set_number:3, weight:75, reps:5 }, { set_number:4, weight:75, reps:4 },
    ]},
    { exercise_id: 'ex-pp', training_type_id: 'tt-pot', notes: 'Foco velocidad', sets: [
      { set_number:1, weight:40, reps:3, intensity_notes:'rápido' }, { set_number:2, weight:45, reps:3, intensity_notes:'rápido' }, { set_number:3, weight:45, reps:3 },
    ]},
  ]},
  { id: 'w-10', date: d(49), name: 'Salto + potencia', notes: '', exercises: [
    { exercise_id: 'ex-jsq', training_type_id: 'tt-pli', notes: 'Sin peso', sets: [
      { set_number:1, reps:5, height_cm:42 }, { set_number:2, reps:5, height_cm:44 }, { set_number:3, reps:5, height_cm:43 },
    ]},
    { exercise_id: 'ex-pcl', training_type_id: 'tt-pot', notes: '', sets: [
      { set_number:1, weight:50, reps:3 }, { set_number:2, weight:55, reps:3 }, { set_number:3, weight:60, reps:2 },
    ]},
  ]},
  { id: 'w-9',  date: d(46), name: 'Tirón', notes: '', exercises: [
    { exercise_id: 'ex-dl', training_type_id: 'tt-fue', notes: '', sets: [
      { set_number:1, weight:100, reps:5 }, { set_number:2, weight:120, reps:3 }, { set_number:3, weight:130, reps:3 },
    ]},
    { exercise_id: 'ex-pu', training_type_id: 'tt-hip', notes: '', sets: [
      { set_number:1, reps:8 }, { set_number:2, reps:7 }, { set_number:3, reps:6 },
    ]},
  ]},
  { id: 'w-8',  date: d(42), name: 'Pierna — fuerza', notes: '', exercises: [
    { exercise_id: 'ex-sq', training_type_id: 'tt-fue', notes: '', sets: [
      { set_number:1, weight:85, reps:5 }, { set_number:2, weight:95, reps:5 }, { set_number:3, weight:105, reps:5 }, { set_number:4, weight:105, reps:5 },
    ]},
    { exercise_id: 'ex-box', training_type_id: 'tt-pli', notes: 'Aterrizaje suave', sets: [
      { set_number:1, reps:5, height_cm:60 }, { set_number:2, reps:5, height_cm:65 }, { set_number:3, reps:5, height_cm:65 },
    ]},
  ]},
  { id: 'w-7',  date: d(39), name: 'Empuje + sprint', notes: '', exercises: [
    { exercise_id: 'ex-bp', training_type_id: 'tt-fue', notes: '', sets: [
      { set_number:1, weight:65, reps:5 }, { set_number:2, weight:72.5, reps:5 }, { set_number:3, weight:77.5, reps:5 }, { set_number:4, weight:77.5, reps:5 },
    ]},
    { exercise_id: 'ex-spr', training_type_id: 'tt-otr', notes: '3 series', sets: [
      { set_number:1, duration_seconds:4.3, distance_meters:30 },
      { set_number:2, duration_seconds:4.2, distance_meters:30 },
      { set_number:3, duration_seconds:4.2, distance_meters:30 },
    ]},
  ]},
  { id: 'w-6',  date: d(35), name: 'Potencia pierna', notes: '', exercises: [
    { exercise_id: 'ex-sq', training_type_id: 'tt-pot', notes: 'Foco velocidad', sets: [
      { set_number:1, weight:60, reps:3, intensity_notes:'rápido' }, { set_number:2, weight:60, reps:3, intensity_notes:'rápido' }, { set_number:3, weight:60, reps:3, intensity_notes:'rápido' },
    ]},
    { exercise_id: 'ex-mtj', training_type_id: 'tt-pli', notes: 'Vallas 50cm', sets: [
      { set_number:1, reps:10 }, { set_number:2, reps:10 }, { set_number:3, reps:10 },
    ]},
  ]},
  { id: 'w-5',  date: d(32), name: 'Pierna — fuerza', notes: '', exercises: [
    { exercise_id: 'ex-sq', training_type_id: 'tt-fue', notes: '', sets: [
      { set_number:1, weight:90, reps:5 }, { set_number:2, weight:100, reps:5 }, { set_number:3, weight:110, reps:5 }, { set_number:4, weight:110, reps:4 },
    ]},
    { exercise_id: 'ex-cb', training_type_id: 'tt-hip', notes: '', sets: [
      { set_number:1, weight:15, reps:12 }, { set_number:2, weight:17.5, reps:10 }, { set_number:3, weight:17.5, reps:9 },
    ]},
  ]},
  { id: 'w-4',  date: d(28), name: 'Tirón pesado', notes: 'Buen día', exercises: [
    { exercise_id: 'ex-dl', training_type_id: 'tt-fue', notes: '', sets: [
      { set_number:1, weight:110, reps:5 }, { set_number:2, weight:130, reps:3 }, { set_number:3, weight:140, reps:2 },
    ]},
    { exercise_id: 'ex-pu', training_type_id: 'tt-hip', notes: '', sets: [
      { set_number:1, reps:9 }, { set_number:2, reps:8 }, { set_number:3, reps:7 },
    ]},
  ]},
  { id: 'w-3',  date: d(21), name: 'Salto + empuje', notes: '', exercises: [
    { exercise_id: 'ex-jsq', training_type_id: 'tt-pli', notes: '', sets: [
      { set_number:1, reps:5, height_cm:45 }, { set_number:2, reps:5, height_cm:46 }, { set_number:3, reps:5, height_cm:47 },
    ]},
    { exercise_id: 'ex-bp', training_type_id: 'tt-fue', notes: '', sets: [
      { set_number:1, weight:70, reps:5 }, { set_number:2, weight:80, reps:5 }, { set_number:3, weight:82.5, reps:4 },
    ]},
  ]},
  { id: 'w-2',  date: d(14), name: 'Pierna — fuerza', notes: '', exercises: [
    { exercise_id: 'ex-sq', training_type_id: 'tt-fue', notes: '', sets: [
      { set_number:1, weight:95, reps:5 }, { set_number:2, weight:105, reps:5 }, { set_number:3, weight:115, reps:5 }, { set_number:4, weight:115, reps:5 },
    ]},
    { exercise_id: 'ex-spr', training_type_id: 'tt-otr', notes: '', sets: [
      { set_number:1, duration_seconds:4.15, distance_meters:30 },
      { set_number:2, duration_seconds:4.1, distance_meters:30 },
      { set_number:3, duration_seconds:4.1, distance_meters:30 },
    ]},
  ]},
  { id: 'w-1',  date: d(7),  name: 'Pierna — PR', notes: 'PR sentadilla 120kg', exercises: [
    { exercise_id: 'ex-sq', training_type_id: 'tt-fue', notes: 'PR', sets: [
      { set_number:1, weight:100, reps:3 }, { set_number:2, weight:110, reps:3 }, { set_number:3, weight:120, reps:3, intensity_notes:'PR' },
    ]},
    { exercise_id: 'ex-box', training_type_id: 'tt-pli', notes: '', sets: [
      { set_number:1, reps:5, height_cm:65 }, { set_number:2, reps:5, height_cm:70 }, { set_number:3, reps:5, height_cm:70 },
    ]},
  ]},
  { id: 'w-0',  date: d(2),  name: 'Empuje + potencia', notes: '', exercises: [
    { exercise_id: 'ex-bp', training_type_id: 'tt-fue', notes: '', sets: [
      { set_number:1, weight:70, reps:5 }, { set_number:2, weight:80, reps:5 }, { set_number:3, weight:85, reps:5 }, { set_number:4, weight:85, reps:4 },
    ]},
    { exercise_id: 'ex-pcl', training_type_id: 'tt-pot', notes: '', sets: [
      { set_number:1, weight:55, reps:3 }, { set_number:2, weight:60, reps:3 }, { set_number:3, weight:62.5, reps:2 },
    ]},
  ]},
];

// Peso corporal — entrada semanal, cut suave 82 → 78
const BODY_WEIGHT = [
  { entry_date: d(56), weight: 82.0 },
  { entry_date: d(49), weight: 81.6 },
  { entry_date: d(42), weight: 81.1 },
  { entry_date: d(35), weight: 80.4 },
  { entry_date: d(28), weight: 80.0 },
  { entry_date: d(21), weight: 79.3 },
  { entry_date: d(14), weight: 78.8, notes: 'Buena semana' },
  { entry_date: d(7),  weight: 78.4 },
  { entry_date: d(2),  weight: 78.1 },
];

Object.assign(window, { TRAINING_TYPES, EXERCISES, WORKOUTS, BODY_WEIGHT });
