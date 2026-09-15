/**
 * @param {number[][]} transactions
 * @return {number}
 */
var minimumMoney = function (transactions) {
    let totalLose = 0;
    let maxCashbackLosing = 0;
    let maxCostWinning = 0;
    for (const [cost, cashback] of transactions) {
        // losers (cashback < cost) drain money permanently; winners don't
        if (cashback < cost) {
            // losers' total drain is fixed regardless of ordering
            totalLose += cost - cashback;
            // worst order: largest-cashback loser goes last, after every
            // other drain, yet its full cost must still be covered
            if (cashback > maxCashbackLosing) maxCashbackLosing = cashback;
        } else {
            // winners only matter via their largest upfront cost, paid at
            // the lowest-funds point (right after the losing block)
            if (cost > maxCostWinning) maxCostWinning = cost;
        }
    }
    // answer = totalLose + max(last loser's cashback, top winner's cost)
    return totalLose + Math.max(maxCashbackLosing, maxCostWinning);
};
