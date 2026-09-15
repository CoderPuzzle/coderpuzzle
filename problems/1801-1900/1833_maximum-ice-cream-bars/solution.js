/**
 * @param {number[]} costs
 * @param {number} coins
 * @return {number}
 */
var maxIceCream = function (costs, coins) {
    // Counting sort: tally each price, then sweep prices from cheapest.
    // Buying cheapest-first is optimal, and the tally makes that walk
    // O(max_price) instead of O(n log n).
    const count = new Array(100001).fill(0);
    for (const c of costs) {
        count[c]++;
    }
    let bought = 0;
    let budget = coins;
    for (let price = 1; price <= 100000; price++) {
        if (count[price] === 0 || price > budget) {
            continue;
        }
        const afford = Math.min(count[price], Math.floor(budget / price));
        bought += afford;
        budget -= afford * price;
        if (budget === 0) {
            break;
        }
    }
    return bought;
};
