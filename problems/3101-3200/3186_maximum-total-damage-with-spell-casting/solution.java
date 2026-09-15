import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

class Solution {

    public long maximumTotalDamage(int[] power) {
        // Copies of equal damage act as one all-or-nothing group worth
        // count * v (casting any copy already bans the rest of that
        // value). Sort unique damages ascending and run a forward
        // take/skip DP where taking v requires predecessors <= v - 3,
        // tracked by a monotone left pointer. Totals reach 10^14 at the
        // bounds, far beyond an int, so run the gains in long.
        Map<Integer, Long> totals = new HashMap<>();
        for (int value : power) {
            totals.merge(value, (long) value, Long::sum);
        }
        List<Integer> values = new ArrayList<>(totals.keySet());
        values.sort(Integer::compareTo);
        int m = values.size();
        long[] best = new long[m];
        int left = 0;
        for (int j = 0; j < m; j++) {
            int v = values.get(j);
            while (values.get(left) <= v - 3) {
                left++;
            }
            long take = totals.get(v) + (left > 0 ? best[left - 1] : 0L);
            long skip = j > 0 ? best[j - 1] : 0L;
            best[j] = Math.max(skip, take);
        }
        return best[m - 1];
    }
}
