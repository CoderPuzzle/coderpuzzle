class Solution {

    public int maxSumTwoNoOverlap(int[] nums, int firstLen, int secondLen) {
        int n = nums.length;
        int[] prefix = new int[n + 1];
        for (int i = 0; i < n; i++) {
            prefix[i + 1] = prefix[i] + nums[i];
        }

        // Try both relative orders: firstLen before secondLen, and
        // secondLen before firstLen. Skipping either one silently misses
        // inputs where the better placement runs the other way.
        return Math.max(best(prefix, n, firstLen, secondLen), best(prefix, n, secondLen, firstLen));
    }

    private int best(int[] prefix, int n, int lead, int trail) {
        // Sweep every position where the trailing window could end,
        // tracking the best leading window that ends at or before the
        // trailing window's start (so the two never overlap, whether they
        // touch or leave a gap between them).
        int maxLead = 0;
        int result = 0;
        for (int end = lead + trail; end <= n; end++) {
            int leadSum = prefix[end - trail] - prefix[end - trail - lead];
            maxLead = Math.max(maxLead, leadSum);
            int trailSum = prefix[end] - prefix[end - trail];
            result = Math.max(result, maxLead + trailSum);
        }
        return result;
    }
}
