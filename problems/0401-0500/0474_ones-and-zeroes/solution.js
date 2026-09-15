/**
 * @param {string[]} strs
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var findMaxForm = function (strs, m, n) {
    // dp[i][j] = most strings pickable with at most i zeros and j ones: a
    // 0/1 knapsack with two resource axes; the all-zero table already
    // encodes "pick nothing".
    const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
    for (const s of strs) {
        // Only the string's shape matters: its 0-count and 1-count.
        let zeros = 0;
        for (const ch of s) if (ch === "0") zeros++;
        const ones = s.length - zeros;
        // Budgets iterate downward so every read sees values from before
        // this string's pass — enforcing 0/1 (once-per-string) use.
        // Take-or-skip: taking is optional when it doesn't pay.
        for (let i = m; i >= zeros; i--) {
            for (let j = n; j >= ones; j--) {
                const cand = dp[i - zeros][j - ones] + 1;
                if (cand > dp[i][j]) dp[i][j] = cand;
            }
        }
    }
    return dp[m][n];
};
