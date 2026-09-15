function sellingWood(m: number, n: number, prices: number[][]): number {
    // Dense price table: 0 where a shape is unsold, max on duplicates.
    const price: number[][] = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
    for (const [h, w, p] of prices) {
        if (price[h][w] < p) price[h][w] = p;
    }
    // dp[i][j] = best revenue from an i x j piece: sell whole, or one
    // horizontal / vertical first cut with both halves solved
    // independently. Increasing i then j keeps every subproblem ready.
    const dp: number[][] = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            // Selling whole is the default a cut must beat.
            let best = price[i][j];
            const row = dp[i];
            // Horizontal cuts: only up to the midpoint — the symmetric i-h
            // split need not be retried. Earlier rows are final.
            for (let h = 1; h <= Math.floor(i / 2); h++) {
                const v = dp[h][j] + dp[i - h][j];
                if (v > best) best = v;
            }
            // Vertical cuts: earlier columns of the current row.
            for (let w = 1; w <= Math.floor(j / 2); w++) {
                const v = row[w] + row[j - w];
                if (v > best) best = v;
            }
            dp[i][j] = best;
        }
    }
    return dp[m][n];
}
