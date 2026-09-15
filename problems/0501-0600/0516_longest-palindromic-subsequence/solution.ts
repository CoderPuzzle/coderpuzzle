function longestPalindromeSubseq(s: string): number {
    const n = s.length;
    if (n === 0) return 0;
    // dp[i][j] = longest palindromic subsequence inside s[i..j]. Filling
    // i descending and j ascending finalizes the three dependencies (drop
    // left end, drop right end, drop both) before each write.
    const dp: number[][] = Array.from({ length: n }, () => Array(n).fill(0));
    for (let i = n - 1; i >= 0; i--) {
        dp[i][i] = 1;
        for (let j = i + 1; j < n; j++) {
            if (s[i] === s[j]) {
                // Matching ends wrap the best inner palindrome; the
                // zero-filled table yields 0 for an empty inner interval.
                dp[i][j] = dp[i + 1][j - 1] + 2;
            } else {
                // At least one end is absent from an optimal answer.
                dp[i][j] = Math.max(dp[i + 1][j], dp[i][j - 1]);
            }
        }
    }
    return dp[0][n - 1];
}
