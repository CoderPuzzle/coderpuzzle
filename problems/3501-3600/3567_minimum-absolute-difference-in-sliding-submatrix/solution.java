import java.util.Arrays;

class Solution {

    public int[][] minAbsDiff(int[][] grid, int k) {
        // Sorting a window's k*k values places the closest pair of distinct
        // values next to each other, so the smallest adjacent gap in the
        // sorted order is the minimum |a - b|; duplicate values contribute
        // a zero gap, and a k == 1 window has no pair, hence the 0 default.
        int m = grid.length;
        int n = grid[0].length;
        int[][] answer = new int[m - k + 1][n - k + 1];
        int[] window = new int[k * k];
        for (int i = 0; i + k <= m; ++i) {
            for (int j = 0; j + k <= n; ++j) {
                int size = 0;
                for (int r = i; r < i + k; ++r) {
                    for (int c = j; c < j + k; ++c) {
                        window[size++] = grid[r][c];
                    }
                }
                Arrays.sort(window);
                int best = k == 1 ? 0 : window[1] - window[0];
                for (int t = 2; t < k * k; ++t) {
                    best = Math.min(best, window[t] - window[t - 1]);
                }
                answer[i][j] = best;
            }
        }
        return answer;
    }
}
