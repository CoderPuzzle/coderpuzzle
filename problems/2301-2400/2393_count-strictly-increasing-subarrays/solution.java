class Solution {

    public long countSubarrays(int[] nums) {
        // run counts strictly increasing subarrays ending at the
        // current index: it grows by one while the rise continues,
        // resets to 1 otherwise. Summing counts every subarray exactly
        // once, by its right endpoint.
        long total = 0;
        long run = 0;
        for (int i = 0; i < nums.length; ++i) {
            if (i > 0 && nums[i - 1] < nums[i]) {
                ++run;
            } else {
                run = 1;
            }
            total += run;
        }
        return total;
    }
}
