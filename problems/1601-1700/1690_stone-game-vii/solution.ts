function stoneGameVII(stones: number[]): number {
    // Each move removes one of the two ends, so a position is fully the
    // run stones[l..r] still on the table. Both players optimize the same
    // number from their own side: dp[l][r] is the best margin, mover's
    // score minus opponent's, on that run — taking the left stone banks
    // sum(l+1..r) and hands the rest over, whose best margin there
    // becomes the taker's deficit; the right stone mirrors it. Fill l
    // descending / r ascending so both shorter runs are ready.
    const n = stones.length;
    const pre: number[] = new Array(n + 1).fill(0);
    for (let i = 0; i < n; i++) pre[i + 1] = pre[i] + stones[i];
    const dp: number[][] = [];
    for (let i = 0; i < n; i++) dp.push(new Array(n).fill(0));
    for (let l = n - 2; l >= 0; l--) {
        const row = dp[l];
        const below = dp[l + 1];
        const pl = pre[l];
        const pl1 = pre[l + 1];
        for (let r = l + 1; r < n; r++) {
            const a = pre[r + 1] - pl1 - below[r];
            const b = pre[r] - pl - row[r - 1];
            row[r] = a > b ? a : b;
        }
    }
    return dp[0][n - 1];
}
