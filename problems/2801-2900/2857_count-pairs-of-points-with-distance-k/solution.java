import java.util.HashMap;
import java.util.Map;

class Solution {

    public int countPairs(int[][] coordinates, int k) {
        Map<Long, Integer> seen = new HashMap<>();
        int total = 0;
        for (int[] point : coordinates) {
            long key = ((long) point[0] << 20) | point[1];
            for (int split = 0; split <= k; split++) {
                long probe = key ^ (((long) split << 20) | (k - split));
                Integer previous = seen.get(probe);
                if (previous != null) {
                    total += previous;
                }
            }
            seen.merge(key, 1, Integer::sum);
        }
        return total;
    }
}
