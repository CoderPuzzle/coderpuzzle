import java.util.HashMap;
import java.util.Map;

class Solution {

    public int[] goodSubsetofBinaryMatrix(int[][] grid) {
        // Each row collapses into an n-bit signature (n <= 5 means at most
        // 32 of them). An all-zero row by itself is a good subset; otherwise
        // the earliest previously stored signature disjoint from the current
        // row completes a size-2 good subset.
        Map<Integer, Integer> seen = new HashMap<>();
        for (int i = 0; i < grid.length; ++i) {
            int mask = 0;
            for (int j = 0; j < grid[i].length; ++j) {
                if (grid[i][j] == 1) mask |= 1 << j;
            }
            if (mask == 0) return new int[] { i };
            for (int other = 0; other < 32; ++other) {
                Integer first = seen.get(other);
                if (first != null && (other & mask) == 0) {
                    return new int[] { first, i };
                }
            }
            seen.putIfAbsent(mask, i);
        }
        return new int[] {};
    }
}
