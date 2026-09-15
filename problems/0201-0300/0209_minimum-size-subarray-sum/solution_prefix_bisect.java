class Solution {

    public int minSubArrayLen(int target, int[] nums) {
        int n = nums.length;
        // prefix[i] = sum of the first i elements. Positivity makes it
        // strictly increasing, which licenses the binary search; longs
        // absorb prefix + target, which can pass 2^31.
        long[] prefix = new long[n + 1];
        for (int i = 0; i < n; i++) {
            prefix[i + 1] = prefix[i] + nums[i];
        }
        // Sentinel: an impossible length that survives when target is never met.
        int best = n + 1;
        for (int i = 0; i < n; i++) {
            long key = prefix[i] + target;
            // Lower bound: the first prefix >= key, searched from i+1 on
            // so the window has positive length.
            int lo = i + 1,
                hi = n + 1;
            while (lo < hi) {
                int mid = (lo + hi) >>> 1;
                if (prefix[mid] < key) lo = mid + 1;
                else hi = mid;
            }
            if (lo <= n) {
                best = Math.min(best, lo - i);
            }
        }
        return best == n + 1 ? 0 : best;
    }
}
