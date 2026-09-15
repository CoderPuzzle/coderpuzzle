import java.util.HashMap;
import java.util.Map;

class Solution {

    public long maxScore(int[] prices) {
        // prices[indexes[j]] - prices[indexes[j - 1]] == indexes[j] -
        // indexes[j - 1] rearranges to prices[i] - i equal on consecutive
        // picks, so every linear selection lives inside one offset group and
        // any subset of one group is linear.  Every price is >= 1, so the
        // best subset of a group is the whole group; the answer is the
        // largest group total.  It is bounded by 10^5 * 10^9 = 10^14, which
        // is why it rides in a long.
        Map<Integer, Long> groupSum = new HashMap<>();
        long best = 0;
        for (int day = 1; day <= prices.length; ++day) {
            int offset = prices[day - 1] - day;
            long total = groupSum.getOrDefault(offset, 0L) + prices[day - 1];
            groupSum.put(offset, total);
            best = Math.max(best, total);
        }
        return best;
    }
}
