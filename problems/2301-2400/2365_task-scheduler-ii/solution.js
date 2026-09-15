/**
 * @param {number[]} tasks
 * @param {number} space
 * @return {number}
 */
var taskSchedulerII = function (tasks, space) {
    // Greedily complete each task on the earliest legal day: breaks only
    // ever help by making a later same-type task legal sooner. Jump the
    // clock to last[type] + space + 1 when the next task is still blocked;
    // the maximum total is ~1e10, far inside Number's exact range.
    const lastDay = new Map();
    let day = 0;
    for (const task of tasks) {
        const previous = lastDay.get(task);
        day = previous === undefined ? day + 1 : Math.max(day + 1, previous + space + 1);
        lastDay.set(task, day);
    }
    return day;
};
