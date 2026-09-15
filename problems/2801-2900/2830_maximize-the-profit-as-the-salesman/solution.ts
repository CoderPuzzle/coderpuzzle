function maximizeTheProfit(n: number, offers: number[][]): number {
    // Non-overlapping offers make this weighted interval scheduling on a
    // line. Bucket offers by end house — the bucket array itself provides
    // ordering by end position, so no sorting is needed.
    const byEnd: number[][][] = Array.from({ length: n }, () => []);
    for (const [start, end, gold] of offers) {
        byEnd[end].push([start, gold]);
    }
    // dp[e + 1]: best gold from houses 0..e. Either house e stays unsold
    // (carry dp[e] forward) or some offer [start, e, gold] is sold on top
    // of the optimum strictly before its start — reading dp[start] is what
    // keeps overlapping offers from being combined.
    const dp = new Array<number>(n + 1).fill(0);
    for (let end = 0; end < n; end++) {
        dp[end + 1] = dp[end];
        for (const [start, gold] of byEnd[end]) {
            const cand = dp[start] + gold;
            if (cand > dp[end + 1]) {
                dp[end + 1] = cand;
            }
        }
    }
    return dp[n];
}
