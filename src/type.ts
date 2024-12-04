export type Exercise = {
  id: string;
  name: string,
  sets: string[],
  setCount: number,
}

export type Workout = {
  id: string;
  name: string;
  exercises: Exercise[];
};

export type Data = {
  id: string;
  date: string;
  workouts: Workout[];
  dayOfWeek: string;
};
