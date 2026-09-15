// dp[i][j] holds the longest palindromic subsequence of s[i..j]; i descends
// and j ascends so both dependencies are ready. Equal ends straddling the
// word boundary mark a palindrome both words contribute to, so the answer is
// the best such dp[i][j] (0 when no boundary pair matches).
function longestPalindrome(word1: string, word2: string): number {
    const n1 = word1.length;
    const s = word1 + word2;
    const n = s.length;
    const dp: number[][] = Array.from({ length: n + 1 }, () => new Array<number>(n + 1).fill(0));
    let best = 0;
    for (let i = n - 1; i >= 0; --i) {
        dp[i][i] = 1;
        const si = s[i];
        for (let j = i + 1; j < n; ++j) {
            if (si === s[j]) {
                const length = dp[i + 1][j - 1] + 2;
                dp[i][j] = length;
                // Equal ends straddling the boundary mean both words
                // contribute at least one character of the palindrome.
                if (i < n1 && j >= n1 && length > best) best = length;
            } else {
                dp[i][j] = Math.max(dp[i + 1][j], dp[i][j - 1]);
            }
        }
    }
    return best;
}
