class Solution {

    public long maximumEnergy(int[] energy, int k) {
        // The curse forces each start's journey: magician i jumps to
        // i + k, then i + 2k, and so on until the line ends. So dp[i],
        // the total gained when starting at i, obeys
        // dp[i] = energy[i] + dp[i + k]: one backward pass fills every
        // chain as a running suffix sum, and the answer is the largest
        // entry. Every journey holds at most n cells of magnitude up to
        // 1000, so |dp[i]| <= 10⁵ * 10³ = 10⁸, which already fits in an
        // int — the long accumulator simply matches the declared return.
        int n = energy.length;
        long[] dp = new long[n];
        dp[n - 1] = energy[n - 1];
        long best = dp[n - 1];
        for (int i = n - 2; i >= 0; i--) {
            long nxt = i + k < n ? dp[i + k] : 0;
            dp[i] = energy[i] + nxt;
            best = Math.max(best, dp[i]);
        }
        return best;
    }
}
