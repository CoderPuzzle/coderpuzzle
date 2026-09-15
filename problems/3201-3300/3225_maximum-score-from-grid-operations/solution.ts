function maximumScore(grid: number[][]): number {
    const n = grid.length;
    // pre[j][r] = sum of grid[0..r-1][j]; every scored stretch of a column
    // is the difference of two such monotone prefixes. Answers reach
    // n*n*10^9 ≈ 10^13, exact under Number's 2^53 ceiling.
    const pre: number[][] = Array.from({ length: n }, () => new Array(n + 1).fill(0));
    for (let j = 0; j < n; j++) {
        for (let r = 0; r < n; r++) pre[j][r + 1] = pre[j][r] + grid[r][j];
    }

    // A play is fully described by one height h[j] in [0, n] per column
    // (cells 0..h[j]-1 end up black). Cell (r, j) scores iff it is white
    // (r >= h[j]) and some horizontal neighbor is black (r < taller
    // neighbor height), so column j is worth the segment of column sums
    // [h[j], max(h[j-1], h[j+1])). Walk columns left to right carrying the
    // last two heights; choosing the next height settles the middle
    // column's flanks, crediting it exactly once. dp[c][a]: best score
    // after assigning columns 0..t-1 with h[t-1] = c, h[t-2] = a.
    let dp: number[][] = Array.from({ length: n + 1 }, () => new Array(n + 1).fill(-Infinity));
    for (let c = 0; c <= n; c++) dp[c][0] = 0;

    for (let t = 1; t < n; t++) {
        const pcol = pre[t - 1];
        const ndp: number[][] = Array.from({ length: n + 1 }, () => new Array(n + 1).fill(-Infinity));
        for (let a = 0; a <= n; a++) {
            const row = dp[a];
            // Credit for choosing h[t] = c is
            //   row[b] + pcol[max(a, b, c)] - pcol[a]
            // over previous heights b. Splitting b against K = max(a, c)
            // makes this an O(1) pair of lookup maxima: b <= K adds the
            // constant pcol[K] to a prefix maximum, while b > K keeps its
            // own pcol[b] in a suffix maximum.
            const pm = new Array(n + 1).fill(-Infinity);
            const sp = new Array(n + 2).fill(-Infinity);
            let m = -Infinity;
            for (let b = 0; b <= n; b++) {
                m = Math.max(m, row[b]);
                pm[b] = m;
            }
            for (let b = n; b >= 0; b--) sp[b] = Math.max(sp[b + 1], row[b] + pcol[b]);
            for (let c = 0; c <= n; c++) {
                const k = Math.max(a, c);
                const best = Math.max(pm[k] + pcol[k], sp[k + 1]);
                ndp[c][a] = Math.max(ndp[c][a], best - pcol[a]);
            }
        }
        dp = ndp;
    }

    // Final virtual choice: the last column has no right neighbor, so it is
    // credited against max(h[n-2], 0).
    const plast = pre[n - 1];
    let ans = -1;
    for (let a = 0; a <= n; a++) {
        const row = dp[a];
        const pm = new Array(n + 1).fill(-Infinity);
        const sp = new Array(n + 2).fill(-Infinity);
        let m = -Infinity;
        for (let b = 0; b <= n; b++) {
            m = Math.max(m, row[b]);
            pm[b] = m;
        }
        for (let b = n; b >= 0; b--) sp[b] = Math.max(sp[b + 1], row[b] + plast[b]);
        const best = Math.max(pm[a] + plast[a], sp[a + 1]);
        ans = Math.max(ans, best - plast[a]);
    }
    return ans;
}
