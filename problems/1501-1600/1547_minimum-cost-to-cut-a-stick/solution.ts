function minCost(n: number, cuts: number[]): number {
    const positions = cuts.slice();
    positions.push(0, n);
    // Sorting matters: the cutting order is free while the input order is
    // not, and the sentinel endpoints make the outermost segments uniform.
    positions.sort((a, b) => a - b);
    const size = positions.length;
    // dp[i][j]: minimum cost of all cuts strictly between boundaries i and
    // j; adjacent boundaries (no interior cut) stay 0.
    const dp: number[][] = Array.from({ length: size }, () => new Array(size).fill(0));
    // Fill by increasing segment length so both subproblems of an interval
    // are already solved when it needs them.
    for (let length = 2; length < size; length++) {
        for (let i = 0; i + length < size; i++) {
            const j = i + length;
            let best = Infinity;
            // Try every interior boundary as the first cut: it splits the
            // segment into independent subproblems and costs the segment's
            // full length.
            for (let k = i + 1; k < j; k++) {
                if (dp[i][k] + dp[k][j] < best) best = dp[i][k] + dp[k][j];
            }
            dp[i][j] = best + (positions[j] - positions[i]);
        }
    }
    return dp[0][size - 1];
}
