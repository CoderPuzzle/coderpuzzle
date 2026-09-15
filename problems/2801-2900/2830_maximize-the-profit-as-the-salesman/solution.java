import java.util.ArrayList;
import java.util.List;

class Solution {

    public int maximizeTheProfit(int n, int[][] offers) {
        // Non-overlapping offers make this weighted interval scheduling on a
        // line. Bucket offers by end house — the bucket array itself
        // provides ordering by end position, so no sorting is needed.
        List<List<int[]>> byEnd = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            byEnd.add(new ArrayList<>());
        }
        for (int[] offer : offers) {
            byEnd.get(offer[1]).add(new int[] { offer[0], offer[2] });
        }
        // dp[e + 1]: best gold from houses 0..e. Either house e stays unsold
        // (carry dp[e] forward) or some offer [start, e, gold] is sold on
        // top of the optimum strictly before its start — reading dp[start]
        // is what keeps overlapping offers from being combined.
        long[] dp = new long[n + 1];
        for (int end = 0; end < n; end++) {
            dp[end + 1] = dp[end];
            for (int[] pair : byEnd.get(end)) {
                long cand = dp[pair[0]] + pair[1];
                if (cand > dp[end + 1]) {
                    dp[end + 1] = cand;
                }
            }
        }
        return (int) dp[n];
    }
}
