/**
 * @param {number[]} satisfaction
 * @return {number}
 */
var maxSatisfaction = function (satisfaction) {
    // Sort ascending; the chosen set is a suffix of this order. Adding a
    // new value at the front shifts every chosen dish one slot later
    // (gaining runningSum) and contributes value * 1 for its own slot, so
    // the net change is value + runningSum.
    satisfaction.sort((a, b) => a - b);
    let total = 0;
    let runningSum = 0;
    for (let i = satisfaction.length - 1; i >= 0; i--) {
        if (runningSum + satisfaction[i] > 0) {
            runningSum += satisfaction[i];
            total += runningSum;
        }
    }
    return total;
};
