class Solution {

    public int maximumDifference(int[] nums) {
        int minimum = nums[0];
        int answer = -1;
        for (int index = 1; index < nums.length; ++index) {
            if (nums[index] > minimum) {
                answer = Math.max(answer, nums[index] - minimum);
            }
            minimum = Math.min(minimum, nums[index]);
        }
        return answer;
    }
}
