import { useMemo } from "react";
import { Data, Workout } from "../../type";

/**
 * Custom hook to generate a week's worth of workout data
 * 
 * @param {Object[]} workoutList - The list of workouts for each weekday
 * @param {string} workoutList[].weekday - The name of the weekday
 * @param {Workout[]} workoutList[].workouts - The list of workouts for the weekday
 * @returns {Data[]} An array of data objects representing each day of the week with workouts
 */
const useGenerateWeek = (workoutList: { weekday: string, workouts: Workout[] }[]): Data[] => {
    /**
    * Generate a week's worth of data starting from the current day
    * 
    * @param {Date} [today=new Date()] - The starting date for the week
    * @returns {Data[]} An array of data objects representing each day of the week with workouts
    */
    const generateWeek = (today = new Date()): Data[] => {
        const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
        const currentDayIndex = today.getDay();
        const startOfWeek = new Date(today);

        startOfWeek.setDate(today.getDate() - (currentDayIndex === 0 ? 6 : currentDayIndex - 1));

        return weekdays.map((day, index) => {
            const date = new Date(startOfWeek);
            date.setDate(startOfWeek.getDate() + index);

            const matchedWorkout = workoutList.find(workoutDay => workoutDay.weekday === day);

            return {
                id: `day-${index + 1}`,
                date: date.toISOString().split("T")[0],
                dayOfWeek: day,
                workouts: matchedWorkout ? matchedWorkout.workouts : [],
            };
        });
    };

    const weekData = useMemo(() => generateWeek(), [workoutList]);

    return weekData;
};

export default useGenerateWeek;
