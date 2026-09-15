/**
 * @param {number} amount
 * @param {number[]} coins
 * @return {number}
 */
var change = function (amount, coins) {
    // dp[a] = number of combinations summing exactly to a; dp[0] = 1 is
    // the empty combination.
    const dp = new Array(amount + 1).fill(0);
    dp[0] = 1;
    // Coins outer, amounts inner: each multiset is built in one fixed coin
    // order, so combinations are counted once (reversed loops would count
    // permutations instead).
    for (const c of coins) {
        // Ascending reads dp[a - c] already updated for this coin —
        // exactly what lets a denomination repeat (unbounded knapsack).
        for (let a = c; a <= amount; a++) {
            dp[a] += dp[a - c];
        }
    }
    return dp[amount];
};
