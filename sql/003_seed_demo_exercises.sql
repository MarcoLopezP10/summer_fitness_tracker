insert into exercises (name, default_training_type_id, notes)
select exercise_name, training_type_id, notes
from (
    values
        ('Sentadilla', 'Fuerza', 'Patrón base de pierna para trabajo pesado.'),
        ('Press banca', 'Fuerza', 'Empuje horizontal clásico.'),
        ('Peso muerto', 'Fuerza', 'Bisagra dominante de fuerza.'),
        ('Sentadilla con salto', 'Pliometría', 'Versión explosiva con énfasis reactivo.'),
        ('Salto al cajón', 'Pliometría', 'Trabajo explosivo vertical.'),
        ('Multisaltos', 'Pliometría', 'Secuencias reactivas de saltos.'),
        ('Power clean', 'Potencia', 'Triple extensión y velocidad.'),
        ('Push press', 'Potencia', 'Empuje vertical con intención explosiva.'),
        ('Sentadilla búlgara', 'Hipertrofia', 'Trabajo unilateral y alto estímulo local.'),
        ('Dominadas', 'Hipertrofia', 'Tracción vertical con control.'),
        ('Curl bíceps', 'Hipertrofia', 'Aislamiento clásico de brazo.'),
        ('Sprint 30m', 'Otro', 'Aceleración corta medida por distancia.')
) as demo(exercise_name, training_type_name, notes)
join training_types on training_types.name = demo.training_type_name
where not exists (
    select 1
    from exercises
    where exercises.name = demo.exercise_name
);
