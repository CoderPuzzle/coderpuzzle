// dp[i] holds the fewest extra characters left over after breaking the
// prefix s[0:i] optimally; dp[0] is the empty prefix.
function minExtraChar(s: string, dictionary: string[]): number {
    const n = s.length;
    const dp: number[] = new Array(n + 1).fill(n + 1);
    dp[0] = 0;
    for (let i = 0; i < n; ++i) {
        // skip move: leave s[i] as an extra character
        if (dp[i] + 1 < dp[i + 1]) {
            dp[i + 1] = dp[i] + 1;
        }
        // match moves: a word starting at i jumps to i + word.length
        for (const word of dictionary) {
            const j = i + word.length;
            if (j <= n && s.startsWith(word, i) && dp[i] < dp[j]) {
                dp[j] = dp[i];
            }
        }
    }
    return dp[n];
}
