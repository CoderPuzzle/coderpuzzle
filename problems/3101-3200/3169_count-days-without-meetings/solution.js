/**
 * @param {number} days
 * @param {number[][]} meetings
 * @return {number}
 */
var countDays = function (days, meetings) {
    meetings.sort((a, b) => a[0] - b[0]);
    let free = 0;
    let lastEnd = 0;
    for (const [start, end] of meetings) {
        if (start > lastEnd) {
            free += start - lastEnd - 1;
        }
        if (end > lastEnd) {
            lastEnd = end;
        }
    }
    free += days - lastEnd;
    return free;
};
