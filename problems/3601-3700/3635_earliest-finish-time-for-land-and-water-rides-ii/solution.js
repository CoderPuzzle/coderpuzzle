/**
 * @param {number[]} landStartTime
 * @param {number[]} landDuration
 * @param {number[]} waterStartTime
 * @param {number[]} waterDuration
 * @return {number}
 */
var earliestFinishTime = function (landStartTime, landDuration, waterStartTime, waterDuration) {
    // Only the moment the first ride ends matters: the second ride then costs
    // max(open, finish) + duration, which never improves when the hand-off
    // gets later. So each order fixes the earliest-finishing ride of the
    // first category and scans the other category.
    const earliestFinish = (starts, durations) => {
        let finish = Infinity;
        for (let i = 0; i < starts.length; i++) {
            finish = Math.min(finish, starts[i] + durations[i]);
        }
        return finish;
    };
    const landFinish = earliestFinish(landStartTime, landDuration);
    const waterFinish = earliestFinish(waterStartTime, waterDuration);
    let landFirst = Infinity;
    for (let j = 0; j < waterStartTime.length; j++) {
        landFirst = Math.min(landFirst, Math.max(waterStartTime[j], landFinish) + waterDuration[j]);
    }
    let waterFirst = Infinity;
    for (let i = 0; i < landStartTime.length; i++) {
        waterFirst = Math.min(waterFirst, Math.max(landStartTime[i], waterFinish) + landDuration[i]);
    }
    return Math.min(landFirst, waterFirst);
};
