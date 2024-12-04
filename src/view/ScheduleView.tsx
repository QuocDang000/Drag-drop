import DayColumn from '../components/DayColumn';
import useGenerateWeek from './hooks/useGenerateWeek';
import { workoutList } from '../mocks/workout-list';

/**
 * ScheduleView component
 * 
 * This component generates a week's worth of workout data and renders a column for each day.
 * 
 * @returns {JSX.Element} The rendered component
 */
export default function ScheduleView(): JSX.Element {
    // Generate a list of data for the week using the workoutList mock data
    const dataList = useGenerateWeek(workoutList);

    return (
        <div className="column-date_container">
            {dataList && dataList.map((data) => (
                <div key={data.id}>
                    <span className="column-date-text">{data.dayOfWeek}</span>
                    <DayColumn data={data} />
                </div>
            ))}
        </div>
    )
}

