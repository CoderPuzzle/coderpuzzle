class Solution {

    public long minTotalTime(int[] forward, int[] backward, int[] queries) {
        // Prefix sums over both road sets. Forward distance a -> b walks
        // forward[a..], backward distance a -> b walks backward[a],
        // backward[a-1], ..., i.e. the descending edge weights. Each move
        // takes the cheaper of the two directions. Totals reach 1e5 moves x
        // 1e10 meters, far past 32 bits.
        int n = forward.length;
        long[] f = new long[n + 1];
        long[] b = new long[n + 1];
        for (int i = 0; i < n; i++) {
            f[i + 1] = f[i] + forward[i];
            b[i + 1] = b[i] + backward[i];
        }
        long tf = f[n],
            tb = b[n];
        long ans = 0;
        int prev = 0;
        for (int q : queries) {
            long fwd = prev < q ? f[q] - f[prev] : tf - f[prev] + f[q];
            long bwd = prev > q ? b[prev + 1] - b[q + 1] : b[prev + 1] + tb - b[q + 1];
            ans += Math.min(fwd, bwd);
            prev = q;
        }
        return ans;
    }
}
