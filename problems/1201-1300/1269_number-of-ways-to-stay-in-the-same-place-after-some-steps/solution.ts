function numWays(steps: number, arrLen: number): number {
    const MOD = 1000000007;
    // each move shifts the position by at most one, so only the window
    // min(arrLen, steps + 1) is reachable — cost is independent of a
    // huge arrLen
    const n = Math.min(arrLen, steps + 1);
    // dp[i] = number of ways to stand at position i after the moves
    // processed so far
    let dp = new Array<number>(n).fill(0);
    dp[0] = 1;
    for (let s = 0; s < steps; s++) {
        const ndp = new Array<number>(n).fill(0);
        for (let i = 0; i < n; i++) {
            // stay, or arrive from the left/right neighbor — both
            // guarded by the window bounds
            let total = dp[i];
            if (i > 0) total += dp[i - 1];
            if (i + 1 < n) total += dp[i + 1];
            ndp[i] = total % MOD;
        }
        dp = ndp;
    }
    // walks that return to the origin after exactly `steps` moves
    return dp[0];
}
