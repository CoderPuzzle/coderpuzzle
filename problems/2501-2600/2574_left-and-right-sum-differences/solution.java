class Solution {

    public int[] leftRightDifference(int[] nums) {
        // rightSum[i] is just total - leftSum[i] - nums[i], so one running
        // prefix replaces both arrays: pay one pass for the total, then a
        // second that walks left forward and emits each absolute
        // difference.
        int total = 0;
        for (int value : nums) {
            total += value;
        }
        int[] answer = new int[nums.length];
        int left = 0;
        for (int i = 0; i < nums.length; ++i) {
            answer[i] = Math.abs(left - (total - left - nums[i]));
            left += nums[i];
        }
        return answer;
    }
}
