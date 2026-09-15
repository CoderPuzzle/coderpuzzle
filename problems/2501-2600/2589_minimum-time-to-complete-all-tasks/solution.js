/**
 * @param {number[][]} tasks
 * @return {number}
 */
var findMinimumTime = function (tasks) {
    // Run each task as late as its window allows: seconds committed at
    // the end of the timeline are inside more upcoming (by end time)
    // windows, so this never steals a second an earlier task needed.
    tasks.sort((a, b) => a[1] - b[1]);
    const running = new Array(2001).fill(false);
    let total = 0;
    for (const [start, end, duration] of tasks) {
        // Reuse whatever is already on inside this window...
        let need = duration;
        for (let t = start; t <= end; ++t) {
            if (running[t]) need--;
        }
        // ...then book the remainder at the latest free points.
        for (let t = end; need > 0; --t) {
            if (!running[t]) {
                running[t] = true;
                total++;
                need--;
            }
        }
    }
    return total;
};
