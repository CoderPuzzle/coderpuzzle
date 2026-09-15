class Solution {

    // A window holding exactly k distinct values has no monotone shrink rule
    // — it can be too wide or too narrow from either side — but a window
    // holding at most t distinct values does. Count the subarrays with at
    // most k distinct values, subtract those with at most k - 1, and exactly
    // k is what remains.
    public long subarraysWithKDistinct(int[] nums, int k) {
        return atMost(nums, k) - atMost(nums, k - 1);
    }

    private long atMost(int[] nums, int limit) {
        int[] freq = new int[nums.length + 1]; // values lie in [1, n]
        int distinct = 0;
        int left = 0;
        long total = 0;
        for (int right = 0; right < nums.length; right++) {
            if (freq[nums[right]] == 0) {
                distinct++;
            }
            freq[nums[right]]++;
            while (distinct > limit) {
                int leaving = nums[left];
                freq[leaving]--;
                if (freq[leaving] == 0) {
                    distinct--;
                }
                left++;
            }
            // every suffix of an at-most window also qualifies, so the
            // window's length counts the subarrays ending at right
            total += right - left + 1;
        }
        return total;
    }
}
