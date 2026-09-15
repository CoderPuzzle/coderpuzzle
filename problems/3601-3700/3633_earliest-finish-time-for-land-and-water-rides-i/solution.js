/**
 * @param {number[]} landStartTime
 * @param {number[]} landDuration
 * @param {number[]} waterStartTime
 * @param {number[]} waterDuration
 * @return {number}
 */
var earliestFinishTime = function (landStartTime, landDuration, waterStartTime, waterDuration) {
    // Delaying a boarding past an opening never helps, and an earlier first
    // finish never pushes the second boarding later: the second leg starts
    // at Math.max(first finish, second opening). Price both orders for
    // every pair and keep the cheapest.
    let best = Infinity;
    for (let i = 0; i < landStartTime.length; ++i) {
        for (let j = 0; j < waterStartTime.length; ++j) {
            const landDone = landStartTime[i] + landDuration[i];
            const waterDone = waterStartTime[j] + waterDuration[j];
            const landFirst = Math.max(landDone, waterStartTime[j]) + waterDuration[j];
            const waterFirst = Math.max(waterDone, landStartTime[i]) + landDuration[i];
            best = Math.min(best, landFirst, waterFirst);
        }
    }
    return best;
};
