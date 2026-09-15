/**
 * @param {number[]} prices
 * @param {number[]} strategy
 * @param {number} k
 * @return {number}
 */
var maxProfit = function (prices, strategy, k) {
    // Only one window can change: rewriting it forfeits the window's current
    // weighted sum and collects the price sum of its second half. Prefix
    // sums over prices and over strategy[i] * prices[i] make both parts an
    // O(1) lookup per window position. Sums stay near 10^10, exact in doubles.
    const n = prices.length;
    let base = 0;
    const pricePrefix = new Array(n + 1).fill(0);
    const weightedPrefix = new Array(n + 1).fill(0);
    for (let i = 0; i < n; i++) {
        base += strategy[i] * prices[i];
        pricePrefix[i + 1] = pricePrefix[i] + prices[i];
        weightedPrefix[i + 1] = weightedPrefix[i] + strategy[i] * prices[i];
    }
    // At most one modification, so the untouched plan is always a candidate.
    let best = base;
    const half = k / 2;
    for (let left = 0; left + k <= n; left++) {
        const right = left + k;
        const removed = weightedPrefix[right] - weightedPrefix[left];
        const gained = pricePrefix[right] - pricePrefix[left + half];
        best = Math.max(best, base - removed + gained);
    }
    return best;
};
