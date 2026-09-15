class Solution {

    public int maxConsistentColumns(int[][] grid, int limit) {
        int rows = grid.length;
        int cols = grid[0].length;
        boolean[][] compatible = new boolean[cols][cols];
        for (int a = 0; a < cols; a++) {
            for (int b = a + 1; b < cols; b++) {
                boolean ok = true;
                for (int r = 0; r < rows; r++) {
                    if (Math.abs(grid[r][b] - grid[r][a]) > limit) {
                        ok = false;
                        break;
                    }
                }
                compatible[a][b] = ok;
            }
        }

        int[] dp = new int[cols];
        java.util.Arrays.fill(dp, 1);
        int answer = 1;
        for (int j = 0; j < cols; j++) {
            for (int i = 0; i < j; i++) {
                if (compatible[i][j]) dp[j] = Math.max(dp[j], dp[i] + 1);
            }
            answer = Math.max(answer, dp[j]);
        }
        return answer;
    }
}
