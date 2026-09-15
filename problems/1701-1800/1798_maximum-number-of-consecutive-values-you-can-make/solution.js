/**
 * @param {number[]} coins
 * @return {number}
 */
var getMaximumConsecutive = function (coins) {
    const sorted = coins.slice().sort((a, b) => a - b);
    // Invariant: every value in [0, reachable] is makeable as a subset sum.
    let reachable = 0;
    for (const coin of sorted) {
        if (coin > reachable + 1) {
            // Gap at reachable + 1; later coins are larger, so it can never be closed.
            break;
        }
        // Cheapest coin extends the contiguous range to reachable + coin.
        reachable += coin;
    }
    // Count of consecutive makeable values 0..reachable.
    return reachable + 1;
};
