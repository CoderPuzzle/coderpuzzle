import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

class Solution {

    public int[][] differenceOfDistinctValues(int[][] grid) {
        // Each main diagonal is swept once downward and once upward. The
        // downward pass records, per cell, how many distinct values lie
        // strictly left-above (the running set size before inserting the
        // cell itself); the upward pass rebuilds the same count for
        // right-below and combines the two.
        int m = grid.length;
        int n = grid[0].length;
        int[][] ans = new int[m][n];
        List<int[]> starts = new ArrayList<>();
        for (int r = 0; r < m; ++r) {
            starts.add(new int[] { r, 0 });
        }
        for (int c = 1; c < n; ++c) {
            starts.add(new int[] { 0, c });
        }
        for (int[] start : starts) {
            Set<Integer> leftAbove = new HashSet<>();
            int sr = start[0];
            int sc = start[1];
            int length = 0;
            int r = sr;
            int c = sc;
            while (r < m && c < n) {
                ans[r][c] = leftAbove.size();
                leftAbove.add(grid[r][c]);
                ++length;
                ++r;
                ++c;
            }
            Set<Integer> rightBelow = new HashSet<>();
            for (int k = length - 1; k >= 0; --k) {
                int x = sr + k;
                int y = sc + k;
                ans[x][y] = Math.abs(ans[x][y] - rightBelow.size());
                rightBelow.add(grid[x][y]);
            }
        }
        return ans;
    }
}
