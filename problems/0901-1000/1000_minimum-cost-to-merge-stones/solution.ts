function mergeStones(stones: number[], k: number): number {
    const n = stones.length;
    // each merge replaces k piles with one (count drops by k - 1), so
    // reaching a single pile requires (k - 1) | (n - 1)
    if ((n - 1) % (k - 1) !== 0) {
        return -1;
    }
    const INF = Infinity;
    const prefix = new Array<number>(n + 1).fill(0);
    for (let i = 0; i < n; i++) {
        prefix[i + 1] = prefix[i] + stones[i];
    }
    // dp[i][j][m] = min cost to compress stones[i..j] into exactly m piles
    const dp: number[][][] = [];
    for (let i = 0; i < n; i++) {
        const row: number[][] = [];
        for (let j = 0; j < n; j++) {
            row.push(new Array<number>(k + 1).fill(INF));
        }
        dp.push(row);
    }
    // base: a single stone is already one pile at zero cost
    for (let i = 0; i < n; i++) {
        dp[i][i][1] = 0;
    }
    // increasing length, so every subinterval is final before it is used
    for (let length = 2; length <= n; length++) {
        for (let i = 0; i + length - 1 < n; i++) {
            const j = i + length - 1;
            // split: left part squeezed to one pile, right to m - 1;
            // any m-pile configuration has such a first-pile split
            for (let m = 2; m <= k; m++) {
                for (let mid = i; mid < j; mid++) {
                    if (dp[i][mid][1] < INF && dp[mid + 1][j][m - 1] < INF) {
                        const cand = dp[i][mid][1] + dp[mid + 1][j][m - 1];
                        if (cand < dp[i][j][m]) {
                            dp[i][j][m] = cand;
                        }
                    }
                }
            }
            // at k piles the interval merges into one pile for a cost
            // equal to its total stones (prefix sums answer in O(1))
            if (dp[i][j][k] < INF) {
                dp[i][j][1] = dp[i][j][k] + prefix[j + 1] - prefix[i];
            }
        }
    }
    return dp[0][n - 1][1] < INF ? dp[0][n - 1][1] : -1;
}
