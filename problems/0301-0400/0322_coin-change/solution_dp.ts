function coinChange(coins: number[], amount: number): number {
    // dp[a] = fewest coins for amount a; dp[0] = 0, every other amount
    // starts unreachable (INF doubles as the no-solution marker).
    const INF = Infinity;
    const dp: number[] = new Array(amount + 1).fill(INF);
    dp[0] = 0;
    // Amounts smallest-first, so dp[a - c] is already final when consulted.
    for (let a = 1; a <= amount; a++) {
        // Try every coin as the last one used: dp[a] = min(dp[a - c] + 1).
        for (const c of coins) {
            if (c <= a && dp[a - c] + 1 < dp[a]) {
                dp[a] = dp[a - c] + 1;
            }
        }
    }
    return dp[amount] === INF ? -1 : dp[amount];
}
