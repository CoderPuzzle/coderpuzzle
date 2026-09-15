import java.util.Arrays;

class Solution {

    // An optimal plan serves each group of targets with a single element
    // (a multiple of the group's lcm), so it uses at most m elements in
    // total, and an exchange argument keeps every group's element among
    // the m cheapest servants of that group — the dp below only sweeps
    // those few candidates. Subsets whose lcm exceeds CAP are skipped:
    // serving such a subset with one element costs more than serving its
    // targets separately ever can, and the lcm fold stays below 10^9.
    public int minimumIncrements(int[] nums, int[] target) {
        int n = nums.length;
        int m = target.length;
        int full = (1 << m) - 1;
        int cap = 100000;
        int[] lcms = new int[full + 1];
        lcms[0] = 1;
        for (int mask = 1; mask <= full; mask++) {
            int low = mask & -mask;
            long l = lcms[mask ^ low];
            int t = target[Integer.numberOfTrailingZeros(low)];
            l = (l / gcd(l, t)) * t;
            lcms[mask] = l <= cap ? (int) l : 0;
        }
        boolean[] cand = new boolean[n];
        int[] bestCost = new int[m];
        int[] bestIdx = new int[m];
        for (int sub = 1; sub <= full; sub++) {
            int l = lcms[sub];
            if (l == 0) {
                continue;
            }
            Arrays.fill(bestCost, Integer.MAX_VALUE);
            Arrays.fill(bestIdx, -1);
            for (int i = 0; i < n; i++) {
                int cost = (l - (nums[i] % l)) % l;
                if (cost >= bestCost[m - 1]) {
                    continue;
                }
                int r = m - 1;
                while (r > 0 && bestCost[r - 1] > cost) {
                    bestCost[r] = bestCost[r - 1];
                    bestIdx[r] = bestIdx[r - 1];
                    r--;
                }
                bestCost[r] = cost;
                bestIdx[r] = i;
            }
            for (int idx : bestIdx) {
                if (idx >= 0) {
                    cand[idx] = true;
                }
            }
        }
        long inf = Long.MAX_VALUE / 4;
        long[] dp = new long[full + 1];
        long[] ndp = new long[full + 1];
        Arrays.fill(dp, inf);
        dp[0] = 0;
        for (int i = 0; i < n; i++) {
            if (!cand[i]) {
                continue;
            }
            int x = nums[i];
            System.arraycopy(dp, 0, ndp, 0, dp.length);
            for (int mask = 0; mask <= full; mask++) {
                long base = dp[mask];
                if (base >= inf) {
                    continue;
                }
                int comp = full ^ mask;
                for (int sub = comp; sub != 0; sub = (sub - 1) & comp) {
                    int l = lcms[sub];
                    if (l == 0) {
                        continue;
                    }
                    long cand2 = base + ((l - (x % l)) % l);
                    if (cand2 < ndp[mask | sub]) {
                        ndp[mask | sub] = cand2;
                    }
                }
            }
            long[] tmp = dp;
            dp = ndp;
            ndp = tmp;
        }
        return (int) dp[full];
    }

    private long gcd(long a, long b) {
        while (b != 0) {
            long t = a % b;
            a = b;
            b = t;
        }
        return a;
    }
}
