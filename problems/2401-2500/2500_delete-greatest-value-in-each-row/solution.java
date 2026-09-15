import java.util.Arrays;

class Solution {

    public int deleteGreatestValue(int[][] grid) {
        // Arrays.sort only orders ascending, so read each round's candidates
        // from the right end instead: after sorting, column n-1-r holds each
        // row's r-th largest value, exactly what round r deletes from it.
        for (int[] row : grid) {
            Arrays.sort(row);
        }
        int m = grid.length;
        int n = grid[0].length;
        int answer = 0;
        for (int r = 1; r <= n; ++r) {
            int best = 0;
            for (int i = 0; i < m; ++i) {
                best = Math.max(best, grid[i][n - r]);
            }
            answer += best;
        }
        return answer;
    }
}
