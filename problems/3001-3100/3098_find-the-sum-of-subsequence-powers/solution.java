import java.util.ArrayList;
import java.util.List;
import java.util.TreeSet;

class Solution {

    public int sumOfPowers(int[] nums, int k) {
        final long MOD = 1000000007L;
        int n = nums.length;
        long[] a = new long[n];
        for (int i = 0; i < n; i++) {
            a[i] = nums[i];
        }
        java.util.Arrays.sort(a);
        TreeSet<Long> diffSet = new TreeSet<>();
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                diffSet.add(a[j] - a[i]);
            }
        }
        List<Long> diffs = new ArrayList<>(diffSet);

        long ans = 0;
        long prevF = 0;
        for (int idx = diffs.size() - 1; idx >= 0; idx--) {
            long d = diffs.get(idx);
            long f = countAtLeast(a, d, k, MOD);
            long g = (((f - prevF) % MOD) + MOD) % MOD;
            ans = (ans + (((d % MOD) * g) % MOD)) % MOD;
            prevF = f;
        }
        return (int) ans;
    }

    // number of length-k subsequences with all adjacent gaps >= d
    private long countAtLeast(long[] a, long d, int k, long MOD) {
        int n = a.length;
        int[] splits = new int[n];
        for (int j = 0; j < n; j++) {
            long target = a[j] - d;
            int lo = 0;
            int hi = j;
            while (lo < hi) {
                int mid = (lo + hi) >>> 1;
                if (a[mid] <= target) {
                    lo = mid + 1;
                } else {
                    hi = mid;
                }
            }
            splits[j] = lo;
        }
        long[] prev = new long[n];
        java.util.Arrays.fill(prev, 1L);
        for (int length = 2; length <= k; length++) {
            long[] pref = new long[n + 1];
            for (int i = 0; i < n; i++) {
                pref[i + 1] = pref[i] + prev[i];
            }
            if (pref[n] == 0) {
                return 0;
            }
            long[] cur = new long[n];
            for (int j = 0; j < n; j++) {
                cur[j] = pref[splits[j]] % MOD;
            }
            prev = cur;
        }
        long total = 0;
        for (int i = 0; i < n; i++) {
            total += prev[i];
        }
        return total % MOD;
    }
}
