import java.util.*;

class Solution {

    public int equalPairs(int[][] grid) {
        // A pair (row, col) counts when both read as the identical sequence,
        // so hash each row once and look every column up in that multiset:
        // the count for a column is how many rows carry its exact sequence.
        int n = grid.length;
        Map<List<Integer>, Integer> rowCounts = new HashMap<>();
        for (int[] row : grid) {
            List<Integer> key = new ArrayList<>(n);
            for (int value : row) {
                key.add(value);
            }
            rowCounts.merge(key, 1, Integer::sum);
        }
        int pairs = 0;
        for (int c = 0; c < n; c++) {
            List<Integer> column = new ArrayList<>(n);
            for (int r = 0; r < n; r++) {
                column.add(grid[r][c]);
            }
            pairs += rowCounts.getOrDefault(column, 0);
        }
        return pairs;
    }
}
