/**
 * @param {string} s
 * @return {number}
 */
var longestPalindromeSubseq = function (s) {
    // Interval DP keyed by the outermost pair's letter: dp[l][r][c] is the
    // longest good palindromic subsequence inside s[l..r] whose first and
    // last characters are both c; nesting a pair around an inner one
    // requires the two letters to differ.
    const n = s.length;
    const dp = [];
    for (let l = 0; l < n; l++) {
        const row = [];
        for (let r = 0; r < n; r++) {
            row.push(new Array(26).fill(0));
        }
        dp.push(row);
    }
    for (let l = n - 2; l >= 0; l--) {
        for (let r = l + 1; r < n; r++) {
            const cur = dp[l][r];
            for (let c = 0; c < 26; c++) {
                cur[c] = Math.max(dp[l][r - 1][c], dp[l + 1][r][c]);
            }
            if (s[l] === s[r]) {
                const c0 = s.charCodeAt(l) - 97;
                const inner = dp[l + 1][r - 1];
                // Best inner length avoiding the outer letter: the row
                // maximum when it peaks elsewhere, the best of the other
                // 25 letters when the row peaks exactly at c0.
                let best1 = -1;
                let best2 = -1;
                let arg1 = 0;
                for (let c = 0; c < 26; c++) {
                    const v = inner[c];
                    if (v > best1) {
                        best2 = best1;
                        best1 = v;
                        arg1 = c;
                    } else if (v > best2) {
                        best2 = v;
                    }
                }
                const best = arg1 === c0 ? best2 : best1;
                if (2 + best > cur[c0]) {
                    cur[c0] = 2 + best;
                }
            }
        }
    }
    return Math.max(...dp[0][n - 1]);
};
