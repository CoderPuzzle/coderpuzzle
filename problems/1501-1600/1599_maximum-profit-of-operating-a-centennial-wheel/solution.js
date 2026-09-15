/**
 * @param {number[]} customers
 * @param {number} boardingCost
 * @param {number} runningCost
 * @return {number}
 */
var minOperationsMaxProfit = function (customers, boardingCost, runningCost) {
    // Simulate one rotation at a time: consume the next arrivals (once
    // customers is exhausted, no more arrive), board up to four of
    // whoever is waiting, and track the running profit. bestProfit
    // starts at 0 and only moves on a *strict* improvement, so the
    // first rotation to reach the eventual maximum is the one kept —
    // matching "return the minimum number of rotations" on ties.
    let waiting = 0;
    let boarded = 0;
    let bestProfit = 0;
    let bestRotation = -1;
    let rotation = 0;
    const n = customers.length;
    let index = 0;
    while (index < n || waiting > 0) {
        if (index < n) {
            waiting += customers[index];
            index++;
        }
        const board = Math.min(4, waiting);
        waiting -= board;
        boarded += board;
        rotation++;
        const profit = boarded * boardingCost - rotation * runningCost;
        if (profit > bestProfit) {
            bestProfit = profit;
            bestRotation = rotation;
        }
    }
    return bestProfit > 0 ? bestRotation : -1;
};
