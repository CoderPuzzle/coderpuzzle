/**
 * @param {string[]} strs
 * @return {number}
 */
var minDeletionSize = function (strs) {
    const rows = strs.length;
    const cols = strs[0].length;
    // dp[j] = the most columns a valid surviving chain can hold when it
    // ends at column j; a later column extends it only when no row
    // descends between the two columns.
    const dp = new Array(cols).fill(1);
    let best = 1;
    for (let j = 0; j < cols; j++) {
        for (let i = 0; i < j; i++) {
            let ok = true;
            for (let r = 0; r < rows && ok; r++) {
                if (strs[r][i] > strs[r][j]) {
                    ok = false;
                }
            }
            if (ok && dp[i] + 1 > dp[j]) {
                dp[j] = dp[i] + 1;
            }
        }
        best = Math.max(best, dp[j]);
    }
    return cols - best;
};
