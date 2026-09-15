function minDistance(word1: string, word2: string): number {
    const a = word1,
        b = word2;
    const la = a.length,
        lb = b.length;
    // dp[i][j] = LCS length of the first i chars of a and first j of b; row/col 0 stay 0.
    const dp: number[][] = Array.from({ length: la + 1 }, () => new Array(lb + 1).fill(0));
    for (let i = 1; i <= la; i++) {
        for (let j = 1; j <= lb; j++) {
            if (a[i - 1] === b[j - 1]) {
                // Matching chars extend the diagonal prefix by one.
                dp[i][j] = dp[i - 1][j - 1] + 1;
            } else {
                // Drop the last char of one string and carry the better result forward.
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }
    // Keep the LCS, delete everything else from both words.
    return la + lb - 2 * dp[la][lb];
}
