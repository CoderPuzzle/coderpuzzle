class Solution {

    public int minCost(int[][] grid) {
        // Every cell value is at most 1023 (10 bits), so any path XOR is in
        // 0..1023. reach[i][j][x] records whether a path ending at (i, j)
        // can achieve XOR x.
        int m = grid.length;
        int n = grid[0].length;
        boolean[][][] reach = new boolean[m][n][1024];
        reach[0][0][grid[0][0]] = true;
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (i == 0 && j == 0) {
                    continue;
                }
                int v = grid[i][j];
                for (int x = 0; x < 1024; x++) {
                    if ((i > 0 && reach[i - 1][j][x]) || (j > 0 && reach[i][j - 1][x])) {
                        reach[i][j][x ^ v] = true;
                    }
                }
            }
        }
        // The smallest reachable XOR at the bottom-right cell is the answer.
        for (int x = 0; x < 1024; x++) {
            if (reach[m - 1][n - 1][x]) {
                return x;
            }
        }
        return -1;
    }
}
