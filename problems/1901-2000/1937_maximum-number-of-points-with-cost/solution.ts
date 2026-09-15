function maxPoints(points: number[][]): number {
    const m = points.length;
    const n = points[0].length;
    // dp[c] = best score with the current row's pick at column c; the
    // first row seeds it with its own point values.
    let prev: number[] = new Array(n);
    for (let c = 0; c < n; c++) prev[c] = points[0][c];
    const left = new Array(n);
    const right = new Array(n);
    for (let r = 1; r < m; r++) {
        // Split |p - c| by direction: from the left the carry-over is
        // dp[p] + p - c, so a running max of dp[p] + p replaces the
        // quadratic predecessor rescan.
        let best = prev[0] + 0;
        for (let c = 0; c < n; c++) {
            if (prev[c] + c > best) best = prev[c] + c;
            left[c] = best;
        }
        // Mirror sweep from the right: running max of dp[p] - p, p >= c.
        best = prev[n - 1] - (n - 1);
        for (let c = n - 1; c >= 0; c--) {
            if (prev[c] - c > best) best = prev[c] - c;
            right[c] = best;
        }
        // Both directions cover p == c (zero penalty), so every predecessor
        // is considered under the correct penalty sign.
        const cur = new Array(n);
        for (let c = 0; c < n; c++) {
            cur[c] = points[r][c] + Math.max(left[c] - c, right[c] + c);
        }
        prev = cur;
    }
    let ans = prev[0];
    for (let c = 1; c < n; c++) {
        if (prev[c] > ans) ans = prev[c];
    }
    return ans;
}
