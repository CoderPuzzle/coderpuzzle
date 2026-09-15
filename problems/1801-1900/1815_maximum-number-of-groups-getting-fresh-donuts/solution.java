import java.util.HashMap;
import java.util.Map;

class Solution {

    // A group is happy when the donut count before it is 0 mod batchSize,
    // so the ordering matters only through remainders. Remainder-0 groups
    // are always happy, complementary remainders pair into zero-sum
    // blocks, and the memoized DP places what is left. Each remainder
    // class count fits 5 bits (n <= 30), so a packed state key fits
    // comfortably in a long.
    public int maxHappyGroups(int batchSize, int[] groups) {
        int k = batchSize;
        int[] freq = new int[k];
        for (int g : groups) {
            freq[g % k]++;
        }
        int ans = freq[0];
        freq[0] = 0;
        for (int i = 1, j = k - 1; i < j; i++, j--) {
            int m = Math.min(freq[i], freq[j]);
            ans += m;
            freq[i] -= m;
            freq[j] -= m;
        }
        if (k % 2 == 0) {
            int h = k / 2;
            ans += freq[h] / 2;
            freq[h] %= 2;
        }
        long state = 0;
        for (int c = 1; c < k; c++) {
            state |= (long) freq[c] << (5 * (c - 1));
        }
        return ans + dp(new HashMap<>(), state, 0, k);
    }

    private int dp(Map<Long, Integer> memo, long state, int r, int k) {
        if (state == 0) {
            return 0;
        }
        Long key = (state << 4) | r;
        Integer cached = memo.get(key);
        if (cached != null) {
            return cached;
        }
        int best = 0;
        for (int c = 1; c < k; c++) {
            int count = (int) ((state >> (5 * (c - 1))) & 31);
            if (count > 0) {
                int gain = r == 0 ? 1 : 0;
                int cand = gain + dp(memo, state - (1L << (5 * (c - 1))), (r + c) % k, k);
                if (cand > best) {
                    best = cand;
                }
            }
        }
        memo.put(key, best);
        return best;
    }
}
