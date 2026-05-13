drop policy if exists "public update exercises" on exercises;
drop policy if exists "public delete exercises" on exercises;
drop policy if exists "public update workouts" on workouts;
drop policy if exists "public delete workouts" on workouts;
drop policy if exists "public update workout_exercises" on workout_exercises;
drop policy if exists "public delete workout_exercises" on workout_exercises;
drop policy if exists "public update sets" on sets;
drop policy if exists "public delete sets" on sets;
drop policy if exists "public delete body_weight" on body_weight;

create policy "public update exercises"
on exercises for update
using (true)
with check (true);

create policy "public delete exercises"
on exercises for delete
using (true);

create policy "public update workouts"
on workouts for update
using (true)
with check (true);

create policy "public delete workouts"
on workouts for delete
using (true);

create policy "public update workout_exercises"
on workout_exercises for update
using (true)
with check (true);

create policy "public delete workout_exercises"
on workout_exercises for delete
using (true);

create policy "public update sets"
on sets for update
using (true)
with check (true);

create policy "public delete sets"
on sets for delete
using (true);

create policy "public delete body_weight"
on body_weight for delete
using (true);
