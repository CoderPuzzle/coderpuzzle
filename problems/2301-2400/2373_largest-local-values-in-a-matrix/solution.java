import java.util.ArrayList;
import java.util.List;

class Solution {

    public int[][] largestLocal(int[][] grid) {
        // Two passes shrink the window work from 9 comparisons per output
        // cell to 6: first collapse every row of 3 horizontally, then take
        // the vertical max of those results.
        int n = grid.length;
        int[][] rowMax = new int[n][n - 2];
        for (int i = 0; i < n; ++i) {
            for (int j = 0; j + 2 < n; ++j) {
                rowMax[i][j] = Math.max(grid[i][j], Math.max(grid[i][j + 1], grid[i][j + 2]));
            }
        }
        int[][] maxLocal = new int[n - 2][n - 2];
        for (int i = 0; i + 2 < n; ++i) {
            for (int j = 0; j + 2 < n; ++j) {
                maxLocal[i][j] = Math.max(rowMax[i][j], Math.max(rowMax[i + 1][j], rowMax[i + 2][j]));
            }
        }
        return maxLocal;
    }
}
