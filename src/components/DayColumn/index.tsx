import { closestCorners, DndContext } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import AddButton from "../../assets/AddButton";
import { Data } from "../../type";
import WorkoutCard from "../WorkoutCard";
import useDayWorkouts from "./hooks/useDayWorkouts";
import checkCurrentDay from "../../utils/checkCurrentDay";

/**
 * DayColumn component
 * 
 * @param {Object} props - The component props
 * @param {Data} props.data - The data for the day, including date and workouts
 * @returns {JSX.Element} The rendered component
 */
const DayColumn = ({ data }: { data: Data }): JSX.Element => {
    const { workouts, handleWorkoutDragEnd, hasWorkoutsWithExercises } = useDayWorkouts(data.workouts);
    const isCurrentDay = checkCurrentDay(data.date);

    return (
        <div className="container-workout-card">
            <div className="container-workout-card_header">
                <span className={isCurrentDay ? "column-current-date" : "column-date"}>{data.date.slice(-2)}</span>

                {!hasWorkoutsWithExercises && (
                    <div className="add-btn">
                        <AddButton />
                    </div>
                )}
            </div>

            <DndContext onDragEnd={handleWorkoutDragEnd} collisionDetection={closestCorners}>
                <SortableContext key={data.id} items={workouts.map((workout) => workout.id)} strategy={verticalListSortingStrategy}>
                    {workouts && workouts.map((workout) => (
                        <WorkoutCard key={workout.id} workout={workout} />
                    ))}
                </SortableContext>
            </DndContext>
        </div>
    );
};

export default DayColumn;
