class Solution {

    public long maxValidPairSum(int[] nums, int k) {
        long bestLeft = nums[0];
        long answer = Long.MIN_VALUE;
        for (int j = k; j < nums.length; j++) {
            bestLeft = Math.max(bestLeft, nums[j - k]);
            answer = Math.max(answer, bestLeft + nums[j]);
        }
        return answer;
    }
}
