import java.util.HashMap;
import java.util.Map;

class Solution {

    public boolean canDistribute(int[] nums, int[] quantity) {
        // A customer's integers must all be equal, so each customer draws
        // from a single value — and a value with count c serves any group
        // of customers whose quantities sum to at most c, with several
        // customers free to share one value. Only the counts matter, m is
        // at most 10, and there are at most 50 distinct values, so a
        // subset DP over customer bitmasks, one frequency value at a
        // time, covers every distribution.
        Map<Integer, Integer> counts = new HashMap<>();
        for (int value : nums) counts.merge(value, 1, Integer::sum);
        int m = quantity.length;
        int full = (1 << m) - 1;
        // subsetSums[mask] = total amount ordered by the customers in mask.
        int[] subsetSums = new int[1 << m];
        for (int mask = 1; mask <= full; ++mask) {
            int low = mask & -mask;
            subsetSums[mask] = subsetSums[mask ^ low] + quantity[Integer.numberOfTrailingZeros(low)];
        }
        // reachable[mask]: the customers in mask are served by the values
        // processed so far. Each value either stays unused (the previous
        // layer carries over) or takes one submask of the still-unsatisfied
        // customers whose quantity sum fits within its count.
        boolean[] reachable = new boolean[1 << m];
        reachable[0] = true;
        for (int count : counts.values()) {
            boolean[] next = reachable.clone();
            for (int mask = 0; mask <= full; ++mask) {
                if (!reachable[mask]) continue;
                int available = full ^ mask;
                for (int submask = available; submask != 0; submask = (submask - 1) & available) {
                    if (subsetSums[submask] <= count) next[mask | submask] = true;
                }
            }
            reachable = next;
        }
        return reachable[full];
    }
}
