/**
 * @param {number} n
 * @param {number[][]} rides
 * @return {number}
 */
var maxTaxiEarnings = function (n, rides) {
    const ending = Array.from({ length: n + 1 }, () => []);
    for (const [start, end, tip] of rides) {
        ending[end].push([start, end - start + tip]);
    }

    const dp = new Array(n + 1).fill(0);
    for (let point = 1; point <= n; ++point) {
        dp[point] = dp[point - 1];
        for (const [start, profit] of ending[point]) {
            dp[point] = Math.max(dp[point], dp[start] + profit);
        }
    }
    return dp[n];
};
