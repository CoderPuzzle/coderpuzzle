class Solution {

    public long minOperations(int[] nums) {
        long total = 0;
        for (int i = 1; i < nums.length; i++) {
            if (nums[i - 1] > nums[i]) {
                total += (long) nums[i - 1] - nums[i];
            }
        }
        return total;
    }
}
