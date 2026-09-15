class Solution {

    public int ways(String[] pizza, int k) {
        final int MOD = 1_000_000_007;
        int rows = pizza.length;
        int cols = pizza[0].length();
        // apples[r][c] = apples in the rectangle (r, c)..(rows-1, cols-1).
        int[][] apples = new int[rows + 1][cols + 1];
        for (int r = rows - 1; r >= 0; r--) {
            for (int c = cols - 1; c >= 0; c--) {
                apples[r][c] =
                    apples[r + 1][c] + apples[r][c + 1] - apples[r + 1][c + 1] + (pizza[r].charAt(c) == 'A' ? 1 : 0);
            }
        }
        long[][][] memo = new long[rows][cols][k];
        return (int) count(apples, memo, 0, 0, k - 1, rows, cols, MOD);
    }

    private long count(
        int[][] apples,
        long[][][] memo,
        int r,
        int c,
        int remaining,
        int rows,
        int cols,
        final int MOD
    ) {
        if (apples[r][c] == 0) {
            return 0;
        }
        if (remaining == 0) {
            return 1;
        }
        if (memo[r][c][remaining] != 0) {
            return memo[r][c][remaining];
        }
        long total = 0;
        // Horizontal cuts: hand away rows r..i-1, keep (i, c).
        for (int i = r + 1; i < rows; i++) {
            if (apples[r][c] - apples[i][c] > 0) {
                total += count(apples, memo, i, c, remaining - 1, rows, cols, MOD);
            }
        }
        // Vertical cuts: hand away columns c..j-1, keep (r, j).
        for (int j = c + 1; j < cols; j++) {
            if (apples[r][c] - apples[r][j] > 0) {
                total += count(apples, memo, r, j, remaining - 1, rows, cols, MOD);
            }
        }
        memo[r][c][remaining] = total % MOD;
        return memo[r][c][remaining];
    }
}
