class Solution {

    public int countPathsWithXorValue(int[][] grid, int k) {
        final int MOD = 1_000_000_007;
        int m = grid.length;
        int n = grid[0].length;
        // dp[i][j][x] = number of paths from (0,0) to (i,j) whose XOR is x
        int[][][] dp = new int[m][n][16];
        dp[0][0][grid[0][0]] = 1;
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (i == 0 && j == 0) continue;
                int cell = grid[i][j];
                for (int x = 0; x < 16; x++) {
                    long total = 0;
                    if (i > 0) total += dp[i - 1][j][x ^ cell];
                    if (j > 0) total += dp[i][j - 1][x ^ cell];
                    dp[i][j][x] = (int) (total % MOD);
                }
            }
        }
        return dp[m - 1][n - 1][k];
    }
}
