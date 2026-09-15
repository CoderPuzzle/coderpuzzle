/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
    // Every sale is fixed by two days: the day it sells and the cheapest
    // day before it, so one pass folding two values answers everything.
    let cheapest = prices[0];
    let best = 0;
    for (const price of prices) {
        // The cheapest prefix so far; on the day it drops to price itself,
        // price - cheapest is 0, so a day can never sell to itself.
        cheapest = Math.min(cheapest, price);
        best = Math.max(best, price - cheapest);
    }
    return best;
};
