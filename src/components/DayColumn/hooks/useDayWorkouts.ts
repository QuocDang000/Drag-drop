import { useState, useCallback, useMemo } from "react";
import { DragEndEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { Workout } from "../../../type";

/**
 * Custom hook to manage workouts for a day
 * 
 * @param {Workout[]} initialWorkouts - The initial list of workouts
 * @returns {Object} An object containing workouts, handleWorkoutDragEnd, and hasWorkoutsWithExercises
 */
const useDayWorkouts = (initialWorkouts: Workout[]) => {
  const [workouts, setWorkouts] = useState<Workout[]>(initialWorkouts);

  /**
   * Get the position of a workout card by its ID
   * 
   * @param {string} id - The ID of the workout
   * @returns {number} The index of the workout in the list
   */
  const getWorkoutCardPosition = useCallback(
    (id: string) => workouts.findIndex((workout) => workout.id === id),
    [workouts]
  );

  /**
   * Handle the end of a drag event for a workout card
   * 
   * @param {DragEndEvent} event - The drag end event
   */
  const handleWorkoutDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;
      const activeId = active.id as string;
      const overId = over?.id as string;

      if (activeId === overId) return;

      const activeIndex = getWorkoutCardPosition(activeId);
      const overIndex = getWorkoutCardPosition(overId);
      setWorkouts((prevWorkouts) => arrayMove(prevWorkouts, activeIndex, overIndex));
    },
    [getWorkoutCardPosition]
  );

  /**
   * Check if there are any workouts with exercises
   * 
   * @returns {boolean} True if there are workouts with exercises, false otherwise
   */
  const hasWorkoutsWithExercises = useMemo(() => {
    return workouts.some((workout) => workout.exercises && workout.exercises.length > 0);
  }, [workouts]);

  return {
    workouts,
    handleWorkoutDragEnd,
    hasWorkoutsWithExercises,
  };
};

export default useDayWorkouts;
