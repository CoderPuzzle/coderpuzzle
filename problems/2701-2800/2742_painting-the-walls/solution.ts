function paintWalls(cost: number[], time: number[]): number {
    const n = cost.length;
    const INF = Infinity;
    // Paying for wall i covers time[i] + 1 walls — itself plus time[i] the
    // free painter paints meanwhile — so a paid set succeeds iff its weights
    // sum to >= n. dp[j]: cheapest selection covering at least j walls'
    // worth of demand.
    const dp: number[] = new Array(n + 1).fill(INF);
    dp[0] = 0;
    for (let i = 0; i < n; i++) {
        const weight = time[i] + 1;
        const c = cost[i];
        // Descending j keeps each wall used at most once (0/1 knapsack);
        // the clamp folds surplus coverage back to the dp[0] origin, sound
        // because coverage beyond n is worthless.
        for (let j = n; j >= 1; j--) {
            const src = j >= weight ? j - weight : 0;
            const cand = dp[src] + c;
            if (cand < dp[j]) dp[j] = cand;
        }
    }
    return dp[n];
}
