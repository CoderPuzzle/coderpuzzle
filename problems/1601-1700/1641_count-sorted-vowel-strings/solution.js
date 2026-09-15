/**
 * @param {number} n
 * @return {number}
 */
var countVowelStrings = function (n) {
    let dp = [1, 1, 1, 1, 1];
    for (let step = 0; step < n - 1; step++) {
        const next = [0, 0, 0, 0, 0];
        let prefix = 0;
        for (let v = 0; v < 5; v++) {
            prefix += dp[v];
            next[v] = prefix;
        }
        dp = next;
    }
    return dp.reduce((a, b) => a + b, 0);
};
