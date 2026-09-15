/**
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
var minDistance = function (word1, word2) {
    const m = word1.length,
        n = word2.length;
    // dp[i][j] = min operations turning the first i chars of word1 into
    // the first j chars of word2. Only the last two table rows are kept,
    // since row i reads only row i-1 and its own left neighbor.
    let prev = new Array(n + 1);
    // Row 0: converting the empty prefix costs j insertions.
    for (let j = 0; j <= n; j++) prev[j] = j;
    for (let i = 1; i <= m; i++) {
        const curr = new Array(n + 1);
        // Column 0: converting an i-char prefix to empty costs i deletions.
        curr[0] = i;
        for (let j = 1; j <= n; j++) {
            if (word1.charCodeAt(i - 1) === word2.charCodeAt(j - 1)) {
                // Last chars align for free: inherit the diagonal.
                curr[j] = prev[j - 1];
            } else {
                // One paid operation must fix the mismatch; each choice
                // covers a distinct final move, so the min is exact.
                // Replace inherits prev[j-1], delete drops word1[i-1]
                // and inherits prev[j], insert appends word2[j-1] and
                // inherits curr[j-1] (one fewer char of word2 to match).
                curr[j] = 1 + Math.min(prev[j - 1], prev[j], curr[j - 1]);
            }
        }
        prev = curr;
    }
    return prev[n];
};
