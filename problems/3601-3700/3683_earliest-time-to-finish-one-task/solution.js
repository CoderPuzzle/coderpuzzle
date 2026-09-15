/**
 * @param {number[][]} tasks
 * @return {number}
 */
var earliestTime = function (tasks) {
    // Tasks never interact: [s, t] finishes at s + t, so the earliest
    // completion is just the smallest such sum.
    let best = tasks[0][0] + tasks[0][1];
    for (let i = 1; i < tasks.length; ++i) {
        const sum = tasks[i][0] + tasks[i][1];
        if (sum < best) {
            best = sum;
        }
    }
    return best;
};
