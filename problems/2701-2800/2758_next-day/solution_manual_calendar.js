// The enhancement itself, hand-rolled: read the stored instant back with
// the UTC getters, step the day-of-month, and roll over through a
// days-in-month table whenever the day passes the month's end — February
// widened to 29 on leap years (divisible by 4, except centuries unless
// divisible by 400), the December overflow carrying into the next year. A
// two-argument padStart formatter zero-pads month and day to two digits and
// the year to four, so the result is exactly "YYYY-MM-DD".
Object.defineProperty(Date.prototype, "nextDay", {
    value: function () {
        const year = this.getUTCFullYear();
        const month = this.getUTCMonth();
        const isLeap = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
        const monthLengths = [31, isLeap ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        let nextYear = year;
        let nextMonth = month;
        let nextDayOfMonth = this.getUTCDate() + 1;
        if (nextDayOfMonth > monthLengths[month]) {
            nextDayOfMonth = 1;
            nextMonth += 1;
            if (nextMonth > 11) {
                nextMonth = 0;
                nextYear += 1;
            }
        }
        const pad = (value, width) => String(value).padStart(width, "0");
        return `${pad(nextYear, 4)}-${pad(nextMonth + 1, 2)}-${pad(nextDayOfMonth, 2)}`;
    },
});

// The judged entry point: the typed wire hands the plain date string here,
// and the answer comes from the enhanced prototype above.
var nextDay = function (date) {
    return new Date(date).nextDay();
};
