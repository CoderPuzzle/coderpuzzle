import java.util.Arrays;

class Solution {

    public int maxWeight(int n, int[][] edges, int k, int t) {
        // Layered bitset DP over path sums: bit s of node v's word array
        // is set iff some path of exactly j edges ends at v with total
        // exactly s (s < t). Weights are >= 1, so a total < t never passes
        // through a prefix >= t, and masking mid-path never drops a path.
        int words = (t + 63) / 64;
        long[] full = new long[words];
        for (int i = 0; i < words; i++) {
            full[i] = -1L;
        }
        if (t % 64 != 0) {
            full[words - 1] = (1L << (t % 64)) - 1L;
        }
        long[] dp = new long[n * words];
        long[] ndp = new long[n * words];
        for (int v = 0; v < n; v++) {
            dp[v * words] = 1L; // empty path (sum 0) at every node
        }
        for (int j = 0; j < k; j++) {
            Arrays.fill(ndp, 0L);
            for (int[] e : edges) {
                int base = e[0] * words,
                    to = e[1] * words,
                    w = e[2];
                for (int i = words - 1; i >= 0; i--) {
                    long val = dp[base + i] << w;
                    if (i > 0) {
                        val |= dp[base + i - 1] >>> (64 - w);
                    }
                    ndp[to + i] |= val & full[i];
                }
            }
            long[] tmp = dp;
            dp = ndp;
            ndp = tmp;
        }
        int best = -1;
        for (int v = 0; v < n; v++) {
            for (int i = words - 1; i >= 0; i--) {
                if (dp[v * words + i] != 0L) {
                    int s = 64 * i + 63 - Long.numberOfLeadingZeros(dp[v * words + i]);
                    if (s > best) {
                        best = s;
                    }
                    break;
                }
            }
        }
        return best;
    }
}
