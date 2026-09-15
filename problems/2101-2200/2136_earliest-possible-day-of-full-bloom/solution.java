import java.util.*;

class Solution {

    public int earliestFullBloom(int[] plantTime, int[] growTime) {
        int n = plantTime.length;
        Integer[] idx = new Integer[n];
        for (int i = 0; i < n; i++) {
            idx[i] = i;
        }
        // Total planting time is fixed regardless of order, so only the
        // order matters: by an exchange argument, plant slow-growing seeds
        // first so their long growth overlaps the planting of the rest.
        Arrays.sort(idx, (a, b) -> growTime[b] - growTime[a]);
        int best = 0;
        int prefix = 0;
        for (int i : idx) {
            // prefix is when seed i finishes planting; it blooms at
            // prefix + growTime[i]. The answer is the max over all seeds —
            // a seed finished early can still bloom last.
            prefix += plantTime[i];
            best = Math.max(best, prefix + growTime[i]);
        }
        return best;
    }
}
