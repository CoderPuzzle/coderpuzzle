import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

class Solution {

    public int countCornerRectangles(int[][] grid) {
        // Scan the rows top to bottom. Every pair of 1-columns in the current
        // row completes one rectangle with each earlier row that already
        // showed the same column pair, so a counter on column pairs charges
        // exactly one unit of work per rectangle.
        int n = grid[0].length;
        Map<Long, Integer> pairRows = new HashMap<>();
        long total = 0;
        for (int[] row : grid) {
            List<Integer> ones = new ArrayList<>();
            for (int c = 0; c < n; ++c) {
                if (row[c] == 1) {
                    ones.add(c);
                }
            }
            for (int i = 0; i < ones.size(); ++i) {
                long base = (long) ones.get(i) * n;
                for (int j = i + 1; j < ones.size(); ++j) {
                    long key = base + ones.get(j);
                    int earlier = pairRows.getOrDefault(key, 0);
                    total += earlier;
                    pairRows.put(key, earlier + 1);
                }
            }
        }
        return (int) total;
    }
}
