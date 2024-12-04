import { useState, useCallback } from "react";
import { DragEndEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { Exercise } from "../../../type";

/**
 * Custom hook to manage exercises within a workout
 * 
 * @param {Exercise[]} initialExercises - The initial list of exercises
 * @returns {Object} An object containing localExercises and handleExerciseDragEnd
 */
const useWorkoutExercises = (initialExercises: Exercise[]) => {
    const [localExercises, setLocalExercises] = useState<Exercise[]>(initialExercises);

    /**
     * Get the position of an exercise card by its ID
     * 
     * @param {string} id - The ID of the exercise
     * @returns {number} The index of the exercise in the list
     */
    const getExerciseCardPosition = useCallback(
        (id: string) => localExercises.findIndex((exercise) => exercise.id === id),
        [localExercises]
    );

    /**
     * Handle the end of a drag event for an exercise card
     * 
     * @param {DragEndEvent} event - The drag end event
     */
    const handleExerciseDragEnd = useCallback(
        (event: DragEndEvent) => {
            const { active, over } = event;
            const activeId = active.id as string;
            const overId = over?.id as string;

            if (activeId === overId) return;

            const activeIndex = getExerciseCardPosition(activeId);
            const overIndex = getExerciseCardPosition(overId);
            setLocalExercises((prevExercises) => arrayMove(prevExercises, activeIndex, overIndex));
        },
        [getExerciseCardPosition]
    );

    return {
        localExercises,
        handleExerciseDragEnd,
    };
};

export default useWorkoutExercises;
