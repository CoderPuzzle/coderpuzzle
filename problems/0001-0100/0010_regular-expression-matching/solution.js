/**
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
var isMatch = function (s, p) {
    const m = s.length,
        n = p.length;
    // dp[i][j]: do the first i chars of s match the first j chars of p?
    const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(false));
    // The empty string matches the empty pattern.
    dp[0][0] = true;
    // First row: only trailing x* units can vanish, so dropping the
    // star's two-character unit must still match nothing.
    for (let j = 1; j <= n; j++) {
        if (p[j - 1] === "*") {
            dp[0][j] = dp[0][j - 2];
        }
    }
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (p[j - 1] === "*") {
                // Two cases cover every repetition count: zero occurrences
                // (erase the x* unit), or one more occurrence of p[j-2]
                // consuming s[i-1].
                dp[i][j] = dp[i][j - 2] || (dp[i - 1][j] && (p[j - 2] === "." || p[j - 2] === s[i - 1]));
            } else {
                // A literal or '.' must consume one character of s that
                // it equals ('.' agrees with anything).
                dp[i][j] = dp[i - 1][j - 1] && (p[j - 1] === "." || p[j - 1] === s[i - 1]);
            }
        }
    }
    // Prefix table: true only when the pattern matches all of s.
    return dp[m][n];
};
