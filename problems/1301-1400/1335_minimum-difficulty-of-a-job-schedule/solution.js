/**
 * @param {number[]} jobDifficulty
 * @param {number} d
 * @return {number}
 */
var minDifficulty = function (jobDifficulty, d) {
    const n = jobDifficulty.length;
    if (n < d) {
        return -1;
    }
    const INF = Infinity;
    const dp = Array.from({ length: d + 1 }, () => new Array(n + 1).fill(INF));
    dp[0][0] = 0;
    for (let j = 1; j <= d; j++) {
        for (let i = j; i <= n; i++) {
            let dayMax = 0;
            let best = INF;
            for (let k = i; k >= j; k--) {
                dayMax = Math.max(dayMax, jobDifficulty[k - 1]);
                const prev = dp[j - 1][k - 1];
                if (prev !== INF && prev + dayMax < best) {
                    best = prev + dayMax;
                }
            }
            dp[j][i] = best;
        }
    }
    return dp[d][n];
};
