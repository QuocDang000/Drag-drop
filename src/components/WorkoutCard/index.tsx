import { DndContext } from "@dnd-kit/core";
import { SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useMemo } from "react";
import AddButton from "../../assets/AddButton";
import ThreeDots from "../../assets/ThreeDots";
import { Workout } from "../../type";
import { getSortableItemStyle } from "../../utils/styleSortableItem";
import ExerciseCard from "../ExerciseCard";
import useWorkoutExercises from "./hooks/useWorkoutExercises";

interface WorkoutCardProps {
    workout: Workout;
}

/**
 * WorkoutCard component
 * 
 * @param {WorkoutCardProps} props - The component props
 * @param {Workout} props.workout - The workout data
 * @returns {JSX.Element} The rendered component
 */
const WorkoutCard = ({ workout }: WorkoutCardProps): JSX.Element => {
    const { id, name, exercises } = workout;
    const { localExercises, handleExerciseDragEnd } = useWorkoutExercises(exercises);
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

    const style = useMemo(
        () => getSortableItemStyle({ transform, transition }),
        [transform, transition]
    );

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="workout-card">
            <div className="workout-card_header_container">
                <span className="workout-card_header">{name}</span>
                <ThreeDots />
            </div>

            <DndContext onDragEnd={handleExerciseDragEnd}>
                <SortableContext
                    items={localExercises.map((exercise) => exercise.id)}
                    strategy={verticalListSortingStrategy}
                >
                    {localExercises && localExercises.map((exercise) => (
                        <ExerciseCard key={exercise.id} exercise={exercise} />
                    ))}
                </SortableContext>

                <div className="add-btn">
                    <AddButton />
                </div>
            </DndContext>
        </div>
    );
};

export default WorkoutCard;
