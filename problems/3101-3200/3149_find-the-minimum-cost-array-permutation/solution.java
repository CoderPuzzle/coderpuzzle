class Solution {

    public int[] findPermutation(int[] nums) {
        int n = nums.length;
        int full = (1 << n) - 1;
        final long INF = Long.MAX_VALUE / 4;

        // f[mask][last] = min additional cost to visit all elements not in
        // mask, starting from `last`, including the closing edge to nums[0]
        long[][] f = new long[1 << n][n];
        for (int last = 0; last < n; last++) {
            f[full][last] = Math.abs(last - nums[0]);
        }
        for (int mask = full - 1; mask >= 1; mask--) {
            for (int last = 0; last < n; last++) {
                if (((mask >> last) & 1) == 0) {
                    continue;
                }
                long best = INF;
                for (int nxt = 0; nxt < n; nxt++) {
                    if (((mask >> nxt) & 1) != 0) {
                        continue;
                    }
                    long cost = Math.abs(last - nums[nxt]) + f[mask | (1 << nxt)][nxt];
                    if (cost < best) {
                        best = cost;
                    }
                }
                f[mask][last] = best;
            }
        }

        // greedy reconstruction: smallest next element keeping the cost optimal
        int[] perm = new int[n];
        int len = 1;
        perm[0] = 0;
        int mask = 1;
        int last = 0;
        for (int step = 1; step < n; step++) {
            for (int nxt = 0; nxt < n; nxt++) {
                if (((mask >> nxt) & 1) != 0) {
                    continue;
                }
                if (Math.abs(last - nums[nxt]) + f[mask | (1 << nxt)][nxt] == f[mask][last]) {
                    perm[len++] = nxt;
                    mask |= 1 << nxt;
                    last = nxt;
                    break;
                }
            }
        }
        return perm;
    }
}
