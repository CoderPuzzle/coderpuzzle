/**
 * @param {number[][][]} schedule
 * @return {number[][]}
 */
var employeeFreeTime = function (schedule) {
    // A moment is free exactly when no employee is busy, so only the
    // union matters: pool every interval, forgetting ownership.
    const intervals = [].concat(...schedule).sort((a, b) => (a[0] !== b[0] ? a[0] - b[0] : a[1] - b[1]));
    const free = [];
    let previousEnd = null;
    for (const [start, end] of intervals) {
        // Starting strictly beyond the furthest end seen so far proves
        // nothing covers (previousEnd, start); strictness keeps
        // touching intervals continuous (no zero-length gaps).
        if (previousEnd !== null && start > previousEnd) {
            free.push([previousEnd, start]);
        }
        // Otherwise merge into the busy block, keeping the running max
        // of ends so a long interval absorbs shorter ones inside it.
        previousEnd = previousEnd === null ? end : Math.max(previousEnd, end);
    }
    return free;
};
