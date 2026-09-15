import java.util.Arrays;

class Solution {

    public long maxSubarraySum(int[] nums, int k) {
        int n = nums.length;
        long[] prefix = new long[n + 1];
        for (int i = 0; i < n; i++) {
            prefix[i + 1] = prefix[i] + nums[i];
        }
        // minPref[r]: smallest prefix sum seen at an index congruent to r
        // mod k. Length divisible by k means both endpoints share a residue,
        // so within each class maximize prefix[i] minus the earlier minimum.
        long[] minPref = new long[k];
        Arrays.fill(minPref, Long.MAX_VALUE);
        // MIN_VALUE start, not 0: an all-negative array still has a best.
        long best = Long.MIN_VALUE;
        for (int i = 0; i <= n; i++) {
            int r = i % k;
            // Compare before updating the bucket, so the paired prefix is
            // strictly earlier and the subarray stays non-empty.
            if (minPref[r] != Long.MAX_VALUE) {
                long cand = prefix[i] - minPref[r];
                if (cand > best) {
                    best = cand;
                }
            }
            if (prefix[i] < minPref[r]) {
                minPref[r] = prefix[i];
            }
        }
        return best;
    }
}
