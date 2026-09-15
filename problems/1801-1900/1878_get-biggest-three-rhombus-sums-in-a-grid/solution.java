import java.util.*;

class Solution {

    // Enumerate every (center, k) rhombus by walking its four edges;
    // keep distinct sums and return the three largest.
    public long[] getBiggestThree(int[][] grid) {
        int m = grid.length;
        int n = grid[0].length;
        TreeSet<Long> sums = new TreeSet<>();
        for (int r = 0; r < m; r++) {
            for (int c = 0; c < n; c++) {
                for (int k = 0; ; k++) {
                    if (r - k < 0 || r + k >= m || c - k < 0 || c + k >= n) {
                        break;
                    }
                    long total;
                    if (k == 0) {
                        total = grid[r][c];
                    } else {
                        total = 0;
                        for (int i = 0; i < k; i++) {
                            total += grid[r - k + i][c - i];
                            total += grid[r + i][c - k + i];
                            total += grid[r + k - i][c + i];
                            total += grid[r - i][c + k - i];
                        }
                    }
                    sums.add(total);
                }
            }
        }
        List<Long> desc = new ArrayList<>(sums.descendingSet());
        int take = Math.min(3, desc.size());
        long[] out = new long[take];
        for (int i = 0; i < take; i++) {
            out[i] = desc.get(i);
        }
        return out;
    }
}
