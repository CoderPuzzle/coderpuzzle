import java.util.*;

class Solution {

    public int maxEqualRowsAfterFlips(int[][] matrix) {
        // column flips XOR one fixed mask onto every row at once, so a row
        // turns uniform iff it equals the mask or its complement: exactly
        // the identical-or-complementary rows can be fixed together
        Map<String, Integer> counts = new HashMap<>();
        int best = 0;
        for (int[] row : matrix) {
            // canonical key: every cell XOR the row's own first cell —
            // identical rows and complementary rows collapse to one key
            StringBuilder sb = new StringBuilder();
            for (int value : row) {
                sb.append(value ^ row[0]);
            }
            String key = sb.toString();
            int next = counts.getOrDefault(key, 0) + 1;
            counts.put(key, next);
            best = Math.max(best, next);
        }
        return best;
    }
}
