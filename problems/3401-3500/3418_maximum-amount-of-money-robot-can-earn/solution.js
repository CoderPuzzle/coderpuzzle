/**
 * @param {number[][]} coins
 * @return {number}
 */
var maximumAmount = function (coins) {
    // dp[k][j]: best total reaching the current cell having used at most k
    // of the 2 neutralizations. Rows update in place (the left neighbor is
    // already fresh), so the cell above is snapshotted first.
    const NEG = -1e9;
    const rows = coins.length;
    const cols = coins[0].length;
    const dp = [new Array(cols).fill(NEG), new Array(cols).fill(NEG), new Array(cols).fill(NEG)];
    for (let i = 0; i < rows; ++i) {
        for (let j = 0; j < cols; ++j) {
            const value = coins[i][j];
            if (i === 0 && j === 0) {
                dp[0][0] = value;
                dp[1][0] = dp[2][0] = Math.max(value, 0);
                continue;
            }
            const up0 = dp[0][j];
            const up1 = dp[1][j];
            const up2 = dp[2][j];
            const left0 = j > 0 ? dp[0][j - 1] : NEG;
            const left1 = j > 0 ? dp[1][j - 1] : NEG;
            const left2 = j > 0 ? dp[2][j - 1] : NEG;
            const best0 = Math.max(up0, left0);
            const best1 = Math.max(up1, left1);
            const best2 = Math.max(up2, left2);
            dp[0][j] = best0 + value;
            // A neutralization (worth it only on a robber) adds 0 here
            // and enters from a neighbor's k-1 layer.
            dp[1][j] = Math.max(best1 + value, value < 0 ? best0 : NEG);
            dp[2][j] = Math.max(best2 + value, value < 0 ? best1 : NEG);
        }
    }
    return Math.max(dp[0][cols - 1], dp[1][cols - 1], dp[2][cols - 1]);
};
