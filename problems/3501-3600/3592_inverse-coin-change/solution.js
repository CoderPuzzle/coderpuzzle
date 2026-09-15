/**
 * @param {number[]} numWays
 * @return {number[]}
 */
var findCoins = function (numWays) {
    // numWays[i] only depends on coins <= i, so scanning amounts in ascending
    // order the coin set is forced: maintain dp = unbounded knapsack
    // way-counts over the coins confirmed so far (dp[0] = 1).
    const n = numWays.length;
    const dp = new Array(n + 1).fill(0);
    dp[0] = 1;
    const coins = [];
    for (let i = 1; i <= n; ++i) {
        const target = numWays[i - 1];
        // If the counts already match, coin i cannot exist: adding it would
        // lift the count to dp[i] + 1.
        if (dp[i] === target) continue;
        // One short means coin i must exist: it contributes dp[0] = 1 extra
        // way to amount i. Fold it into the running DP.
        if (dp[i] + 1 !== target) return [];
        coins.push(i);
        for (let s = i; s <= n; ++s) dp[s] += dp[s - i];
    }
    return coins;
};
