import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

class Solution {

    // State: ranks i, j of the two stars in a row of m survivors.
    private final Map<Long, long[]> memo = new HashMap<>();

    public int[] earliestAndLatest(int n, int firstPlayer, int secondPlayer) {
        long[] res = dp(firstPlayer, secondPlayer, n);
        return new int[] { (int) res[0], (int) res[1] };
    }

    private long[] dp(int i, int j, int m) {
        if (i + j == m + 1) {
            return new long[] { 1, 1 };
        }
        if (i > m - j + 1) {
            return dp(m - j + 1, m - i + 1, m);
        }
        long key = ((long) i << 40) | ((long) j << 20) | m;
        long[] cached = memo.get(key);
        if (cached != null) {
            return cached;
        }
        int half = (m + 1) / 2;
        int[] freeK = new int[half];
        int[] freeB = new int[half];
        int nfree = 0;
        for (int k = 1; k <= half; k++) {
            int back = m + 1 - k;
            if (k < back && i != k && i != back && j != k && j != back) {
                freeK[nfree] = k;
                freeB[nfree] = back;
                nfree++;
            }
        }
        long lo = Integer.MAX_VALUE,
            hi = 0;
        for (int mask = 0; mask < 1 << nfree; mask++) {
            int[] survivors = new int[half];
            int cnt = 0;
            for (int k = 1; k <= half; k++) {
                int back = m + 1 - k;
                if (k == back) {
                    survivors[cnt++] = k;
                } else if (i == k || i == back) {
                    survivors[cnt++] = i;
                } else if (j == k || j == back) {
                    survivors[cnt++] = j;
                } else {
                    int pick = back;
                    for (int t = 0; t < nfree; t++) {
                        if (freeK[t] == k && ((mask >> t) & 1) == 1) {
                            pick = k;
                        }
                    }
                    survivors[cnt++] = pick;
                }
            }
            Arrays.sort(survivors, 0, cnt);
            int nf = 0,
                ns = 0;
            for (int t = 0; t < cnt; t++) {
                if (survivors[t] == i) nf = t + 1;
                if (survivors[t] == j) ns = t + 1;
            }
            long[] sub = dp(nf, ns, cnt);
            lo = Math.min(lo, sub[0]);
            hi = Math.max(hi, sub[1]);
        }
        long[] res = new long[] { lo + 1, hi + 1 };
        memo.put(key, res);
        return res;
    }
}
