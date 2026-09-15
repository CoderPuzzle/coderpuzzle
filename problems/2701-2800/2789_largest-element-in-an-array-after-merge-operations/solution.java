class Solution {

    public long maxArrayValue(int[] nums) {
        long pile = nums[nums.length - 1];
        long best = pile;
        for (int i = nums.length - 2; i >= 0; --i) {
            if (pile >= nums[i]) {
                pile += nums[i];
            } else {
                pile = nums[i];
            }
            best = Math.max(best, pile);
        }
        return best;
    }
}
