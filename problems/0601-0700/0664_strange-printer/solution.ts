function strangePrinter(s: string): number {
    // dp[i][j] is the fewest turns that print s[i..j]. The stroke that
    // leaves s[i] standing either covers i alone, dp[i+1][j] + 1, or runs
    // on to some k with s[k] == s[i]: that stroke is shared with the
    // suffix s[k..j] while the overprinted gap s[i+1..k-1] is solved on
    // its own, dp[i+1][k-1] + dp[k][j].
    const n = s.length;
    const dp = Array.from({ length: n }, () => new Array<number>(n).fill(0));
    for (let i = n - 1; i >= 0; --i) {
        dp[i][i] = 1;
        for (let j = i + 1; j < n; ++j) {
            let best = dp[i + 1][j] + 1;
            for (let k = i + 1; k <= j; ++k) {
                if (s[k] === s[i] && dp[i + 1][k - 1] + dp[k][j] < best) {
                    best = dp[i + 1][k - 1] + dp[k][j];
                }
            }
            dp[i][j] = best;
        }
    }
    return dp[0][n - 1];
}
