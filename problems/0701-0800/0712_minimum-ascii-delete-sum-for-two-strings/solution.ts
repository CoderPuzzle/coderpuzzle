function minimumDeleteSum(s1: string, s2: string): number {
    const a = s1,
        b = s2;
    const la = a.length,
        lb = b.length;
    // dp[i][j] = min deleted-ASCII cost of equalizing the prefixes a[:i], b[:j].
    const dp: number[][] = Array.from({ length: la + 1 }, () => new Array(lb + 1).fill(0));
    // Base row/column: matching against the empty string deletes everything.
    for (let j = 1; j <= lb; j++) {
        dp[0][j] = dp[0][j - 1] + b.charCodeAt(j - 1);
    }
    for (let i = 1; i <= la; i++) {
        dp[i][0] = dp[i - 1][0] + a.charCodeAt(i - 1);
        for (let j = 1; j <= lb; j++) {
            if (a[i - 1] === b[j - 1]) {
                // Equal chars are both kept — free reduction to shorter prefixes.
                dp[i][j] = dp[i - 1][j - 1];
            } else {
                // A mismatch can retain at most one end: pay its ASCII value.
                dp[i][j] = Math.min(dp[i - 1][j] + a.charCodeAt(i - 1), dp[i][j - 1] + b.charCodeAt(j - 1));
            }
        }
    }
    return dp[la][lb];
}
