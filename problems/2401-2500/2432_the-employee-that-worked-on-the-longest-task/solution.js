/**
 * @param {number} n
 * @param {number[][]} logs
 * @return {number}
 */
var hardestWorker = function (n, logs) {
    // The ith task runs from the previous leave time to logs[i][1] (task 0
    // starts at 0). Keep the best (longest, then smallest id) running.
    let bestId = -1;
    let bestTime = -1;
    let prev = 0;
    for (const [emp, leave] of logs) {
        const duration = leave - prev;
        if (duration > bestTime || (duration === bestTime && emp < bestId)) {
            bestTime = duration;
            bestId = emp;
        }
        prev = leave;
    }
    return bestId;
};
