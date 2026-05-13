drop policy if exists "public read training_types" on training_types;
drop policy if exists "public insert training_types" on training_types;
drop policy if exists "public read exercises" on exercises;
drop policy if exists "public insert exercises" on exercises;
drop policy if exists "public read workouts" on workouts;
drop policy if exists "public insert workouts" on workouts;
drop policy if exists "public read workout_exercises" on workout_exercises;
drop policy if exists "public insert workout_exercises" on workout_exercises;
drop policy if exists "public read sets" on sets;
drop policy if exists "public insert sets" on sets;
drop policy if exists "public read body_weight" on body_weight;
drop policy if exists "public insert body_weight" on body_weight;
drop policy if exists "public update body_weight" on body_weight;

create policy "authenticated read training_types"
on training_types for select
to authenticated
using (true);

create policy "authenticated read exercises"
on exercises for select
to authenticated
using (true);

create policy "authenticated insert exercises"
on exercises for insert
to authenticated
with check (true);

create policy "authenticated update exercises"
on exercises for update
to authenticated
using (true)
with check (true);

create policy "authenticated delete exercises"
on exercises for delete
to authenticated
using (true);

create policy "authenticated read workouts"
on workouts for select
to authenticated
using (true);

create policy "authenticated insert workouts"
on workouts for insert
to authenticated
with check (true);

create policy "authenticated update workouts"
on workouts for update
to authenticated
using (true)
with check (true);

create policy "authenticated delete workouts"
on workouts for delete
to authenticated
using (true);

create policy "authenticated read workout_exercises"
on workout_exercises for select
to authenticated
using (true);

create policy "authenticated insert workout_exercises"
on workout_exercises for insert
to authenticated
with check (true);

create policy "authenticated update workout_exercises"
on workout_exercises for update
to authenticated
using (true)
with check (true);

create policy "authenticated delete workout_exercises"
on workout_exercises for delete
to authenticated
using (true);

create policy "authenticated read sets"
on sets for select
to authenticated
using (true);

create policy "authenticated insert sets"
on sets for insert
to authenticated
with check (true);

create policy "authenticated update sets"
on sets for update
to authenticated
using (true)
with check (true);

create policy "authenticated delete sets"
on sets for delete
to authenticated
using (true);

create policy "authenticated read body_weight"
on body_weight for select
to authenticated
using (true);

create policy "authenticated insert body_weight"
on body_weight for insert
to authenticated
with check (true);

create policy "authenticated update body_weight"
on body_weight for update
to authenticated
using (true)
with check (true);

create policy "authenticated delete body_weight"
on body_weight for delete
to authenticated
using (true);
