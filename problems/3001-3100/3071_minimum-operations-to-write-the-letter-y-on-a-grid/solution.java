class Solution {

    public int minimumOperationsToWriteY(int[][] grid) {
        int n = grid.length;
        int mid = n / 2;
        int[] yCount = new int[3];
        int[] otherCount = new int[3];
        for (int r = 0; r < n; ++r) {
            for (int c = 0; c < n; ++c) {
                boolean onY = (r == c && r <= mid) || (c == n - 1 - r && r <= mid) || (c == mid && r >= mid);
                if (onY) {
                    ++yCount[grid[r][c]];
                } else {
                    ++otherCount[grid[r][c]];
                }
            }
        }
        int best = n * n;
        for (int yValue = 0; yValue < 3; ++yValue) {
            for (int otherValue = 0; otherValue < 3; ++otherValue) {
                if (yValue == otherValue) {
                    continue;
                }
                int cost = 0;
                for (int value = 0; value < 3; ++value) {
                    if (value != yValue) {
                        cost += yCount[value];
                    }
                    if (value != otherValue) {
                        cost += otherCount[value];
                    }
                }
                best = Math.min(best, cost);
            }
        }
        return best;
    }
}
