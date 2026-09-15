/**
 * @param {string} date
 * @return {number}
 */
var dayOfYear = function (date) {
    const year = Number(date.slice(0, 4));
    const month = Number(date.slice(5, 7));
    const day = Number(date.slice(8, 10));
    const days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    // Gregorian leap rule: div by 4, except centuries, except 400.
    const leap = year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
    if (leap) days[1] = 29;
    return day + days.slice(0, month - 1).reduce((a, b) => a + b, 0);
};
