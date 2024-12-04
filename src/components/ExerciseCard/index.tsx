import { useMemo } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { Exercise } from "../../type";
import { getSortableItemStyle } from "../../utils/styleSortableItem";

interface ExerciseCardProps {
    exercise: Exercise;
}

/**
 * ExerciseCard component
 * 
 * @param {ExerciseCardProps} props - The component props
 * @param {Exercise} props.exercise - The exercise data
 * @returns {JSX.Element} The rendered component
 */
const ExerciseCard = ({ exercise }: ExerciseCardProps): JSX.Element => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
        id: exercise.id,
    });

    const style = useMemo(
        () => getSortableItemStyle({ transform, transition }),
        [transform, transition]
    );

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className="exercise-card"
        >
            <span className="exercise-card-text">{exercise.name}</span>
            <div className="exercise-card-text_container">
                <span className="exercise-card-text-set-count">{exercise.setCount}x</span>
                <span className="exercise-card-text-sets">{exercise.sets.join(", ")}</span>
            </div>
        </div>
    );
};

export default ExerciseCard;
