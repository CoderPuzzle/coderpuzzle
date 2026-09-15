/**
 * @param {number[]} piles
 * @return {boolean}
 */
var stoneGame = function (piles) {
    // dp[i][j] = the best final score difference (mover minus opponent)
    // over piles[i..j]: taking an end scores it and hands the rest
    // over, so the opponent's best difference on the shorter row
    // counts against the taker.
    const n = piles.length;
    const dp = piles.map(() => new Array(n).fill(0));
    for (let i = 0; i < n; ++i) {
        dp[i][i] = piles[i];
    }
    for (let length = 2; length <= n; ++length) {
        for (let i = 0; i + length - 1 < n; ++i) {
            const j = i + length - 1;
            dp[i][j] = Math.max(piles[i] - dp[i + 1][j], piles[j] - dp[i][j - 1]);
        }
    }
    return dp[0][n - 1] > 0;
};
