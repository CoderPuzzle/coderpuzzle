class Solution {

    public long minOperations(int[] nums1, int[] nums2, int k) {
        // Each operation moves +k units onto one index and -k units off
        // another, so index i needs exactly |diff_i| / k operations
        // pushing it toward its target: every difference must be divisible
        // by k, and the ups must cancel the downs exactly (sum of diffs
        // == 0). Every operation accounts for 2k units of that movement,
        // hence sum(|diff|) / (2k). k == 0 changes nothing per operation,
        // so only arrays that are already equal work. The mass is
        // <= n * 10^9 = 10^14 and answers are <= 5*10^13, both long-safe.
        if (k == 0) {
            for (int i = 0; i < nums1.length; ++i) {
                if (nums1[i] != nums2[i]) return -1L;
            }
            return 0L;
        }
        long kk = k;
        long net = 0,
            mass = 0;
        for (int i = 0; i < nums1.length; ++i) {
            long diff = (long) nums2[i] - nums1[i];
            if (Math.abs(diff) % kk != 0) return -1L;
            net += diff;
            mass += Math.abs(diff);
        }
        return net != 0 ? -1L : mass / (2 * kk);
    }
}
