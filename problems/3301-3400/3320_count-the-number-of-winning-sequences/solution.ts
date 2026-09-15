function countWinningSequences(s: string): number {
    // Rows are Bob's last move; columns are diff = Bob's points minus
    // Alice's, shifted by n + 1 so -n..n indexes 0..2n+2. Each round,
    // target row t is fed by the two other rows — both moved by the same
    // delta(t, alice) — so one elementwise add plus one shifted copy
    // advances every diff at once, keeping the bottom-up pass at O(n^2)
    // with no recursion.
    const MOD = 1_000_000_007;
    const DELTA: number[][] = [
        [0, -1, 1],
        [1, 0, -1],
        [-1, 1, 0],
    ]; // target x alice: Fire, Water, Earth
    const code = (c: string): number => (c === "F" ? 0 : c === "W" ? 1 : 2);
    const n = s.length;
    const offset = n + 1;
    const width = 2 * n + 3;
    // Row entries stay below MOD; the final triple-row total stays below
    // 6 * 10^3 * MOD < 2^53, so Number arithmetic is exact throughout.
    let dp: number[][] = Array.from({ length: 3 }, () => new Array(width).fill(0));
    for (let m = 0; m < 3; ++m) dp[m][offset + DELTA[m][code(s[0])]] = 1;
    for (let i = 1; i < n; ++i) {
        const a = code(s[i]);
        const ndp: number[][] = Array.from({ length: 3 }, () => new Array(width).fill(0));
        for (let t = 0; t < 3; ++t) {
            const u = (t + 1) % 3;
            const v = (t + 2) % 3;
            const d = DELTA[t][a];
            for (let j = 0; j < width; ++j) {
                const nj = j + d;
                if (nj < 0 || nj >= width) continue;
                let value = dp[u][j] + dp[v][j];
                if (value >= MOD) value -= MOD;
                ndp[t][nj] = value;
            }
        }
        dp = ndp;
    }
    let total = 0;
    for (let m = 0; m < 3; ++m) {
        for (let j = offset + 1; j < width; ++j) total += dp[m][j];
    }
    return total % MOD;
}
