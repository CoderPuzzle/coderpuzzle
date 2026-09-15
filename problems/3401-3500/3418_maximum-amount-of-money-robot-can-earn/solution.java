import java.util.Arrays;

class Solution {

    // dp[k][j]: best total reaching the current cell having used at most k
    // of the 2 neutralizations. Rows update in place (the left neighbor is
    // already fresh), so the cell above is snapshotted first.
    public int maximumAmount(int[][] coins) {
        final int NEG = -1_000_000_000;
        int rows = coins.length,
            cols = coins[0].length;
        int[][] dp = new int[3][cols];
        for (int[] layer : dp) {
            Arrays.fill(layer, NEG);
        }
        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < cols; j++) {
                int value = coins[i][j];
                if (i == 0 && j == 0) {
                    dp[0][0] = value;
                    dp[1][0] = dp[2][0] = Math.max(value, 0);
                    continue;
                }
                int up0 = dp[0][j],
                    up1 = dp[1][j],
                    up2 = dp[2][j];
                int left0 = j > 0 ? dp[0][j - 1] : NEG;
                int left1 = j > 0 ? dp[1][j - 1] : NEG;
                int left2 = j > 0 ? dp[2][j - 1] : NEG;
                int best0 = Math.max(up0, left0);
                int best1 = Math.max(up1, left1);
                int best2 = Math.max(up2, left2);
                dp[0][j] = best0 + value;
                // A neutralization (worth it only on a robber) adds 0 here
                // and enters from a neighbor's k-1 layer.
                dp[1][j] = Math.max(best1 + value, value < 0 ? best0 : NEG);
                dp[2][j] = Math.max(best2 + value, value < 0 ? best1 : NEG);
            }
        }
        return Math.max(dp[0][cols - 1], Math.max(dp[1][cols - 1], dp[2][cols - 1]));
    }
}
