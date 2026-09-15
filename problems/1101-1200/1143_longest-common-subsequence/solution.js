/**
 * @param {string} text1
 * @param {string} text2
 * @return {number}
 */
var longestCommonSubsequence = function (text1, text2) {
    const m = text1.length;
    const n = text2.length;
    // dp row for the empty prefix of text1 (all zeros); each new row only
    // reads the row above, so two rows suffice
    let prev = new Array(n + 1).fill(0);
    for (let i = 1; i <= m; i++) {
        const curr = new Array(n + 1).fill(0);
        const c = text1.charCodeAt(i - 1);
        for (let j = 1; j <= n; j++) {
            if (c === text2.charCodeAt(j - 1)) {
                // aligning matching last chars is always safe: extend the
                // LCS of both shorter prefixes
                curr[j] = prev[j - 1] + 1;
            } else {
                // an optimal LCS discards at least one of the two
                // characters, so take the better of dropping either
                curr[j] = Math.max(prev[j], curr[j - 1]);
            }
        }
        prev = curr;
    }
    return prev[n];
};
