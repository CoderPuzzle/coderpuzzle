import java.util.HashMap;
import java.util.Map;

class Solution {

    public int getSum(int[] nums) {
        // Per-value chain-sum DP over four hash maps keyed by value. For
        // each direction, incCnt/decCnt count the chains seen so far that
        // end at an element of a value and incSum/decSum carry their total
        // element-sum; buckets accumulate across duplicate occurrences, so
        // element x extends every earlier chain ending at x-1 (or x+1) —
        // subsequence semantics, not substring. New chains ending here have
        // count cnt + 1 (the singleton [x]) and sum sum + cnt * x + x; the
        // singleton lives in both directions but is counted once, so the
        // step contributes incSum' + decSum' - x. Reduced mod 10^9 + 7 every
        // update: stored values < 10^9 + 7, widest intermediate is
        // cnt * x + sum < ~1.1 * 10^14, within long.
        final long MOD = 1_000_000_007L;
        Map<Integer, Long> incCnt = new HashMap<>();
        Map<Integer, Long> incSum = new HashMap<>();
        Map<Integer, Long> decCnt = new HashMap<>();
        Map<Integer, Long> decSum = new HashMap<>();
        long total = 0;
        for (int x : nums) {
            long ci = incCnt.getOrDefault(x - 1, 0L);
            long si = incSum.getOrDefault(x - 1, 0L);
            long cd = decCnt.getOrDefault(x + 1, 0L);
            long sd = decSum.getOrDefault(x + 1, 0L);
            long ni = (ci + 1) % MOD;
            long nsi = (si + ni * x) % MOD;
            long nd = (cd + 1) % MOD;
            long nsd = (sd + nd * x) % MOD;
            total = (((total + nsi + nsd - x) % MOD) + MOD) % MOD;
            incCnt.put(x, (incCnt.getOrDefault(x, 0L) + ni) % MOD);
            incSum.put(x, (incSum.getOrDefault(x, 0L) + nsi) % MOD);
            decCnt.put(x, (decCnt.getOrDefault(x, 0L) + nd) % MOD);
            decSum.put(x, (decSum.getOrDefault(x, 0L) + nsd) % MOD);
        }
        return (int) total;
    }
}
