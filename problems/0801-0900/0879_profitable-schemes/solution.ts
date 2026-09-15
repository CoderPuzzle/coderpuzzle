function profitableSchemes(n: number, minProfit: number, group: number[], profit: number[]): number {
    const MOD = 1000000007;
    // dp[members][cap] = number of subsets using at most `members` members and
    // at least `cap` profit; cap is capped at minProfit.
    const dp: number[][] = Array.from({ length: n + 1 }, () => new Array(minProfit + 1).fill(0));
    for (let members = 0; members <= n; members++) {
        dp[members][0] = 1;
    }
    for (let idx = 0; idx < group.length; idx++) {
        const g = group[idx];
        const p = profit[idx];
        for (let members = n; members >= g; members--) {
            for (let cap = minProfit; cap >= 0; cap--) {
                const prev = cap - p > 0 ? cap - p : 0;
                dp[members][cap] = (dp[members][cap] + dp[members - g][prev]) % MOD;
            }
        }
    }
    return dp[n][minProfit];
}
