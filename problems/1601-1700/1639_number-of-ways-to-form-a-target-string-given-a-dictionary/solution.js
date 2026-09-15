/**
 * @param {string[]} words
 * @param {string} target
 * @return {number}
 */
var numWays = function (words, target) {
    const MOD = 1000000007;
    const width = words[0].length;
    const n = target.length;
    // Fewer columns than target characters: no strictly increasing
    // sequence of that length exists.
    if (n > width) return 0;

    // charCount[k][c]: how many rows have letter c at column k.
    const charCount = Array.from({ length: width }, () => new Array(26).fill(0));
    for (const word of words) {
        for (let k = 0; k < width; k++) {
            charCount[k][word.charCodeAt(k) - 97]++;
        }
    }

    // dp[i]: ways to have placed the first i target characters using the
    // columns considered so far. Rolled forward one column at a time.
    const dp = new Array(n + 1).fill(0);
    dp[0] = 1;
    for (let k = 0; k < width; k++) {
        // Walk i downward so dp[i - 1] still reflects the previous column's
        // value when it feeds dp[i] this round -- the usual rolling-knapsack
        // update order.
        for (let i = n; i >= 1; i--) {
            const need = target.charCodeAt(i - 1) - 97;
            dp[i] = (dp[i] + dp[i - 1] * charCount[k][need]) % MOD;
        }
    }
    return dp[n];
};
