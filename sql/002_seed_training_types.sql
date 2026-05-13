insert into training_types (name, description) values
    (
        'Pliometría',
        'Ejercicios explosivos como saltos, multisaltos, lanzamientos o acciones reactivas. Pueden realizarse con peso o sin peso.'
    ),
    (
        'Potencia',
        'Trabajo orientado a mover cargas o el propio cuerpo a máxima velocidad posible.'
    ),
    (
        'Fuerza',
        'Trabajo enfocado en maximizar la carga levantada y mejorar la fuerza máxima.'
    ),
    (
        'Hipertrofia',
        'Trabajo enfocado en aumentar el tamaño muscular mediante volumen, tensión mecánica y control del esfuerzo.'
    ),
    (
        'Otro',
        'Tipo genérico para ejercicios que no encajen claramente en las categorías principales.'
    )
on conflict (name) do nothing;
