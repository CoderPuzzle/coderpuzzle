class Solution {

    public int minFallingPathSum(int[][] grid) {
        int n = grid.length;
        int[] prev = grid[0].clone();
        for (int i = 1; i < n; i++) {
            int min1 = Integer.MAX_VALUE,
                min2 = Integer.MAX_VALUE,
                idx1 = -1;
            for (int j = 0; j < n; j++) {
                int v = prev[j];
                if (v < min1) {
                    min2 = min1;
                    min1 = v;
                    idx1 = j;
                } else if (v < min2) {
                    min2 = v;
                }
            }
            int[] cur = new int[n];
            for (int j = 0; j < n; j++) {
                cur[j] = grid[i][j] + (j == idx1 ? min2 : min1);
            }
            prev = cur;
        }
        int best = Integer.MAX_VALUE;
        for (int v : prev) best = Math.min(best, v);
        return best;
    }
}
