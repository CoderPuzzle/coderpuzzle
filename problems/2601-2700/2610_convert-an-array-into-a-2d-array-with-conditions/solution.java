import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

class Solution {

    public int[][] findMatrix(int[] nums) {
        // A value's k-th occurrence (counted from zero) always belongs to row
        // k: each row must hold distinct elements, so earlier copies can only
        // have occupied strictly earlier rows. Appending there therefore never
        // duplicates within a row, the rows stay minimal because one opens only
        // when a repeat forces a deeper level, and scanning in input order
        // keeps the construction fully deterministic.
        Map<Integer, Integer> seen = new HashMap<>();
        List<List<Integer>> rows = new ArrayList<>();
        for (int value : nums) {
            int rank = seen.getOrDefault(value, 0);
            seen.put(value, rank + 1);
            if (rank == rows.size()) {
                rows.add(new ArrayList<>());
            }
            rows.get(rank).add(value);
        }
        int[][] result = new int[rows.size()][];
        for (int i = 0; i < result.length; i++) {
            List<Integer> row = rows.get(i);
            int[] flat = new int[row.size()];
            for (int j = 0; j < flat.length; j++) {
                flat[j] = row.get(j);
            }
            result[i] = flat;
        }
        return result;
    }
}
