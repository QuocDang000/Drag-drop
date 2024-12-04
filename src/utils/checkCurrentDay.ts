/**
 * Check if the given date is the current day
 * 
 * @param {string} date - The date to check, in a format that can be parsed by the Date constructor
 * @returns {boolean} True if the date is the current day, false otherwise
 */
const checkCurrentDay = (date: string): boolean => {
    const today = new Date();
    const dataDate = new Date(date);

    return (
        today.getFullYear() === dataDate.getFullYear() &&
        today.getMonth() === dataDate.getMonth() &&
        today.getDate() === dataDate.getDate()
    );
};

export default checkCurrentDay;