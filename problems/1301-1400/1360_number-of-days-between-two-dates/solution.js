/**
 * @param {string} date1
 * @param {string} date2
 * @return {number}
 */
var daysBetweenDates = function (date1, date2) {
    // Day numbers from a fixed epoch; the answer is their difference.
    const isLeap = (year) => year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
    const monthLengths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const dayNumber = (date) => {
        const year = parseInt(date.slice(0, 4), 10);
        const month = parseInt(date.slice(5, 7), 10);
        const day = parseInt(date.slice(8, 10), 10);
        let total = 0;
        for (let y = 1971; y < year; ++y) {
            total += isLeap(y) ? 366 : 365;
        }
        for (let m = 1; m < month; ++m) {
            total += monthLengths[m - 1];
            if (m === 2 && isLeap(year)) {
                total += 1;
            }
        }
        return total + day - 1;
    };
    return Math.abs(dayNumber(date1) - dayNumber(date2));
};
