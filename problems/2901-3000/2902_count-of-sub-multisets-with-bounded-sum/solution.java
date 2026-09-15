import java.util.HashMap;
import java.util.Map;

class Solution {

    public int countSubMultisets(int[] nums, int l, int r) {
        // Group equal values: a sub-multiset takes each distinct value v
        // somewhere in 0..cnt[v] copies, so one pass per distinct value
        // applies the bounded-knapsack factor new[x] = sum(dp[x - k*v]
        // for k in 0..cnt[v]): a forward unbounded pass folds dp[x - v]
        // into dp[x], then subtracting dp[x - (cnt+1)*v] removes every
        // choice that used too many copies. Zeros change no sum and
        // multiply every count by cnt[0] + 1; the answer is the range
        // sum dp[l] + ... + dp[r].
        final int MOD = 1_000_000_007;
        Map<Integer, Integer> counts = new HashMap<>();
        for (int v : nums) {
            counts.merge(v, 1, Integer::sum);
        }
        long[] dp = new long[r + 1];
        dp[0] = 1;
        for (var entry : counts.entrySet()) {
            int v = entry.getKey();
            int c = entry.getValue();
            if (v == 0) {
                for (int x = 0; x <= r; x++) {
                    dp[x] = (dp[x] * (c + 1)) % MOD;
                }
            } else if (v <= r) {
                for (int x = v; x <= r; x++) {
                    dp[x] = (dp[x] + dp[x - v]) % MOD;
                }
                long width = (long) (c + 1) * v;
                for (int x = r; x >= width; x--) {
                    dp[x] = (dp[x] - dp[(int) (x - width)] + MOD) % MOD;
                }
            }
        }
        long ans = 0;
        for (int x = l; x <= r; x++) {
            ans += dp[x];
        }
        return (int) (ans % MOD);
    }
}
