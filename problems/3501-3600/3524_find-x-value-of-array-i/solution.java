class Solution {

    public long[] resultArray(int[] nums, int k) {
        // Removing a prefix and a suffix is the same as choosing the
        // non-empty contiguous middle that survives, so result[x] counts
        // subarrays whose product is x mod k. The running DP extends every
        // subarray ending at the previous element by nums[i] and adds the
        // singleton [i]. Counts reach 5,000,050,000 for n = 10^5 — beyond
        // int — and r * nums[i] reaches 4 * 10^9, so both are longs.
        long[] counts = new long[k];
        long[] result = new long[k];
        for (int num : nums) {
            long[] extended = new long[k];
            for (int r = 0; r < k; ++r) {
                if (counts[r] > 0) {
                    extended[(int) ((r * (long) num) % k)] += counts[r];
                }
            }
            extended[num % k] += 1;
            for (int r = 0; r < k; ++r) {
                result[r] += extended[r];
            }
            counts = extended;
        }
        return result;
    }
}
