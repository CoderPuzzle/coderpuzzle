import java.util.Arrays;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

class Solution {

    public int minimumCost(String target, String[] words, int[] costs) {
        // Reverse DP over suffixes: dp[i] is the minimum cost to assemble
        // target[i:], dp[n] is 0, and each position extends every word that
        // matches its next characters. Duplicate words collapse to their
        // cheapest cost first; per position only DISTINCT word lengths matter,
        // and their count never exceeds sqrt(2 * total word characters).
        // Walking candidate lengths ascending lets one wrapping long
        // polynomial hash of target[i:i+length) extend in O(1) per step; a
        // hash hit only triggers an exact map probe, so correctness never
        // rests on the hash — a collision merely wastes one probe. Costs
        // accumulate in 64-bit room (the answer itself fits an int).
        Map<String, Integer> best = new HashMap<>();
        for (int k = 0; k < words.length; k++) {
            Integer prev = best.get(words[k]);
            if (prev == null || costs[k] < prev) {
                best.put(words[k], costs[k]);
            }
        }
        int n = target.length();
        Map<Integer, Set<Long>> buckets = new HashMap<>();
        int maxLen = 0;
        for (String word : best.keySet()) {
            long h = 0;
            for (int k = 0; k < word.length(); k++) {
                h = h * 131 + word.charAt(k);
            }
            buckets.computeIfAbsent(word.length(), length -> new HashSet<>()).add(h);
            maxLen = Math.max(maxLen, word.length());
        }
        final long big = 1L << 62;
        long[] dp = new long[n + 1];
        Arrays.fill(dp, big);
        dp[n] = 0;
        for (int i = n - 1; i >= 0; i--) {
            long cur = big;
            long h = 0;
            int limit = Math.min(maxLen, n - i);
            for (int length = 1; length <= limit; length++) {
                h = h * 131 + target.charAt(i + length - 1);
                Set<Long> bucket = buckets.get(length);
                if (bucket != null && bucket.contains(h)) {
                    Integer cost = best.get(target.substring(i, i + length));
                    if (cost != null) {
                        long nxt = dp[i + length];
                        if (nxt != big && nxt + cost < cur) {
                            cur = nxt + cost;
                        }
                    }
                }
            }
            dp[i] = cur;
        }
        return dp[0] >= big ? -1 : (int) dp[0];
    }
}
