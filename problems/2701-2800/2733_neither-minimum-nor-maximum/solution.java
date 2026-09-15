class Solution {

    public int findNonMinOrMax(int[] nums) {
        if (nums.length < 3) {
            return -1;
        }
        int sum = nums[0] + nums[1] + nums[2];
        int lo = Math.min(Math.min(nums[0], nums[1]), nums[2]);
        int hi = Math.max(Math.max(nums[0], nums[1]), nums[2]);
        return sum - lo - hi;
    }
}
