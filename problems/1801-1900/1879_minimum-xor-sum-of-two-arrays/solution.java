class Solution {

    public int minimumXORSum(int[] nums1, int[] nums2) {
        int n = nums1.length;
        int size = 1 << n;
        long INF = Long.MAX_VALUE;
        long[] dp = new long[size];
        java.util.Arrays.fill(dp, INF);
        dp[0] = 0;
        for (int mask = 1; mask < size; mask++) {
            int i = Integer.bitCount(mask) - 1; // index into nums1 for this subset
            long x = nums1[i];
            long best = INF;
            int m = mask;
            while (m != 0) {
                int lowbit = m & -m;
                int j = Integer.numberOfTrailingZeros(lowbit);
                long cand = dp[mask ^ lowbit] + (x ^ (long) nums2[j]);
                if (cand < best) best = cand;
                m -= lowbit;
            }
            dp[mask] = best;
        }
        return (int) dp[size - 1];
    }
}
