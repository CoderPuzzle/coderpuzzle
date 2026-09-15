/**
 * @param {string} s
 * @return {number}
 */
var deleteString = function (s) {
    // dp[i] = max operations to delete s[i:]; LCP via two rolling rows
    const n = s.length;
    const dp = new Array(n + 1).fill(1);
    dp[n] = 0; // empty suffix needs no operations
    let nextRow = new Array(n + 1).fill(0); // lcp row for index i+1
    for (let i = n - 1; i >= 0; i--) {
        const si = s.charCodeAt(i);
        const cur = new Array(n + 1).fill(0);
        for (let j = n - 1; j >= 0; j--) {
            if (si === s.charCodeAt(j)) {
                cur[j] = nextRow[j + 1] + 1;
            }
        }
        let best = 1;
        const maxLen = Math.floor((n - i) / 2);
        for (let length = 1; length <= maxLen; length++) {
            if (cur[i + length] >= length) {
                const cand = 1 + dp[i + length];
                if (cand > best) {
                    best = cand;
                }
            }
        }
        dp[i] = best;
        nextRow = cur;
    }
    return dp[0];
};
