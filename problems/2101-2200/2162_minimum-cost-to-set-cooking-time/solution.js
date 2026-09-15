/**
 * @param {number} startAt
 * @param {number} moveCost
 * @param {number} pushCost
 * @param {number} targetSeconds
 * @return {number}
 */
var minCostSetTime = function (startAt, moveCost, pushCost, targetSeconds) {
    // Only minutes in [0, 99] whose implied seconds target - 60*minutes
    // also land in [0, 99] are settable at all; cost each survivor by
    // walking its digit sequence after normalization trims the zeroes
    // the microwave would otherwise prepend.
    let best = Infinity;
    for (let minutes = 0; minutes <= 99; minutes++) {
        const seconds = targetSeconds - 60 * minutes;
        if (seconds < 0 || seconds > 99) continue;
        const digits = [Math.floor(minutes / 10), minutes % 10, Math.floor(seconds / 10), seconds % 10];
        let start = 0;
        while (start < 4 && digits[start] === 0) start++;
        let cost = 0;
        let finger = startAt;
        for (let index = start; index < 4; index++) {
            const digit = digits[index];
            if (digit !== finger) {
                cost += moveCost;
                finger = digit;
            }
            cost += pushCost;
        }
        best = Math.min(best, cost);
    }
    return best;
};
