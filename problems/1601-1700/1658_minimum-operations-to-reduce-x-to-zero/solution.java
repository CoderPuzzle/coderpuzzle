class Solution {

    public int minOperations(int[] nums, int x) {
        int total = 0;
        for (int v : nums) total += v;
        int target = total - x; // longest middle subarray summing to target
        if (target < 0) return -1;
        if (target == 0) return nums.length;
        int best = -1;
        int window = 0;
        int left = 0;
        for (int right = 0; right < nums.length; right++) {
            window += nums[right];
            while (window > target) {
                window -= nums[left];
                left++;
            }
            if (window == target) {
                best = Math.max(best, right - left + 1);
            }
        }
        return best == -1 ? -1 : nums.length - best;
    }
}
