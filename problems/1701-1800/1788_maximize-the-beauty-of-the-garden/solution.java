import java.util.HashMap;
import java.util.Map;

class Solution {

    public int maximumBeauty(int[] flowers) {
        // A valid garden keeps two equally beautiful endpoints i < j and,
        // since removal is free, every positive strictly between them: its
        // sum is 2v + P[j] - P[i+1] with P[k] the sum of max(flowers[t], 0)
        // below k. seen[v] tracks the smallest P[i+1] over past occurrences
        // of v (P only grows, so that is the first one). Totals stay under
        // 1e5 * 1e4 + 2e4 < 2^31 - 1, so int is exact throughout.
        Map<Integer, Integer> seen = new HashMap<>();
        int pos = 0;
        int answer = Integer.MIN_VALUE;
        for (int v : flowers) {
            Integer best = seen.get(v);
            if (best != null) {
                answer = Math.max(answer, 2 * v + pos - best);
            }
            if (v > 0) {
                pos += v;
            }
            if (best == null || pos < best) {
                seen.put(v, pos);
            }
        }
        return answer;
    }
}
