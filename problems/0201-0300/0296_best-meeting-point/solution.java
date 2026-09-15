import java.util.ArrayList;
import java.util.List;

class Solution {

    public int minTotalDistance(int[][] grid) {
        // A row-major sweep collects the row indexes already sorted; a
        // column-major sweep does the same for the column indexes, so
        // neither axis needs an explicit sort.
        int m = grid.length,
            n = grid[0].length;
        List<Integer> rows = new ArrayList<>();
        List<Integer> cols = new ArrayList<>();
        for (int r = 0; r < m; ++r) {
            for (int c = 0; c < n; ++c) {
                if (grid[r][c] == 1) {
                    rows.add(r);
                }
            }
        }
        for (int c = 0; c < n; ++c) {
            for (int r = 0; r < m; ++r) {
                if (grid[r][c] == 1) {
                    cols.add(c);
                }
            }
        }
        // Manhattan distance adds the two axes independently, and on a line a
        // median of the coordinates minimizes the sum of absolute differences
        // — so the answer is the two spreads around the two medians.
        int rowPivot = rows.get(rows.size() / 2);
        int colPivot = cols.get(cols.size() / 2);
        int total = 0;
        // With an even count, every index between the two middle ones ties
        // for the minimum; the upper middle is as good as any.
        for (int r : rows) {
            total += Math.abs(r - rowPivot);
        }
        for (int c : cols) {
            total += Math.abs(c - colPivot);
        }
        return total;
    }
}
