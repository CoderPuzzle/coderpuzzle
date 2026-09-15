class Solution {

    public int findNumberOfLIS(int[] nums) {
        // lengths[i] / counts[i]: the longest strictly increasing subsequence
        // ending at i, and how many of that length end there. A longer
        // predecessor (nums[j] < nums[i]) resets the count to counts[j], an
        // equally long one adds to it, so each i finishes with the total over
        // its best arrivals. Only the returned answer is promised to fit 32
        // bits - counts below the maximum can stand far higher - so the
        // accumulation stays in longs.
        int n = nums.length;
        int[] lengths = new int[n];
        long[] counts = new long[n];
        int best = 0;
        long answer = 0;
        for (int i = 0; i < n; ++i) {
            lengths[i] = 1;
            counts[i] = 1;
            for (int j = 0; j < i; ++j) {
                if (nums[j] >= nums[i]) continue;
                int candidate = lengths[j] + 1;
                if (candidate > lengths[i]) {
                    lengths[i] = candidate;
                    counts[i] = counts[j];
                } else if (candidate == lengths[i]) {
                    counts[i] += counts[j];
                }
            }
            if (lengths[i] > best) {
                best = lengths[i];
                answer = counts[i];
            } else if (lengths[i] == best) {
                answer += counts[i];
            }
        }
        return (int) answer;
    }
}
