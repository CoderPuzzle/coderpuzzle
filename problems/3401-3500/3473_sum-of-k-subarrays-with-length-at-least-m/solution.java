import java.util.Arrays;

class Solution {

    public int maxSum(int[] nums, int k, int m) {
        final int NEG = Integer.MIN_VALUE / 4; // sentinel far below any reachable value
        final int n = nums.length;
        long[] prefix = new long[n + 1];
        for (int i = 0; i < n; i++) {
            prefix[i + 1] = prefix[i] + nums[i];
        }
        // dp over rows: prev[j] = best sum of (i-1) subarrays within first j elements
        long[] prev = new long[n + 1]; // i = 0, all zeros
        for (int round = 1; round <= k; round++) {
            long[] cur = new long[n + 1];
            Arrays.fill(cur, NEG);
            long best = NEG; // running max of prev[t] - prefix[t] for t <= j - m
            for (int j = 1; j <= n; j++) {
                int t = j - m;
                if (t >= 0) {
                    long cand = prev[t] - prefix[t];
                    if (cand > best) best = cand;
                }
                if (best != NEG) {
                    long val = prefix[j] + best;
                    cur[j] = cur[j - 1] > val ? cur[j - 1] : val;
                } else {
                    cur[j] = cur[j - 1];
                }
            }
            prev = cur;
        }
        return (int) prev[n];
    }
}
