import java.util.HashMap;
import java.util.Map;

class Solution {

    public int minimumCost(String target, String[] words, int[] costs) {
        // Forward DP over prefixes: dp[i] is the minimum cost to assemble
        // target[:i], dp[0] is 0, and every reachable position extends each
        // DISTINCT word matching its next characters. Duplicate words first
        // collapse to their cheapest occurrence. The Easy bounds are small —
        // at most 50 words against a target of at most 2000 characters — so
        // a direct scan of all words at all positions suffices; greedy
        // longest-match fails (a pricey long word can block cheaper short
        // ones), and an unreachable dp[n] is the -1 case. The j <= n bound
        // rejects words longer than the remaining suffix before any compare.
        // Costs accumulate in 64-bit room even though any achievable cost is
        // at most len(target) * max(cost) = 2 * 10^8, which fits an int.
        Map<String, Long> best = new HashMap<>();
        for (int k = 0; k < words.length; k++) {
            best.merge(words[k], (long) costs[k], Math::min);
        }
        int n = target.length();
        final long big = 1L << 62;
        long[] dp = new long[n + 1];
        java.util.Arrays.fill(dp, big);
        dp[0] = 0;
        for (int i = 0; i < n; i++) {
            if (dp[i] == big) {
                continue;
            }
            for (Map.Entry<String, Long> entry : best.entrySet()) {
                String word = entry.getKey();
                int j = i + word.length();
                if (j > n || dp[i] + entry.getValue() >= dp[j]) {
                    continue;
                }
                if (target.startsWith(word, i)) {
                    dp[j] = dp[i] + entry.getValue();
                }
            }
        }
        return dp[n] >= big ? -1 : (int) dp[n];
    }
}
