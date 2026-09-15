/**
 * @param {string} str1
 * @param {string} str2
 * @return {string}
 */
var shortestCommonSupersequence = function (str1, str2) {
    const n = str1.length;
    const m = str2.length;
    // dp[i][j] = length of the LCS of str1[i:] and str2[j:].
    const dp = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));
    for (let i = n - 1; i >= 0; i--) {
        for (let j = m - 1; j >= 0; j--) {
            if (str1[i] === str2[j]) {
                dp[i][j] = dp[i + 1][j + 1] + 1;
            } else {
                dp[i][j] = Math.max(dp[i + 1][j], dp[i][j + 1]);
            }
        }
    }

    const parts = [];
    let i = 0;
    let j = 0;
    while (i < n && j < m) {
        if (str1[i] === str2[j]) {
            parts.push(str1[i]);
            i += 1;
            j += 1;
        } else if (dp[i + 1][j] >= dp[i][j + 1]) {
            parts.push(str1[i]);
            i += 1;
        } else {
            parts.push(str2[j]);
            j += 1;
        }
    }
    parts.push(str1.slice(i));
    parts.push(str2.slice(j));
    return parts.join("");
};
