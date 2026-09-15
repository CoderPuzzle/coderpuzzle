class Solution {

    public long maximumAlternatingSubarraySum(int[] nums) {
        long plus = nums[0];
        long minus = 0;
        boolean hasMinus = false;
        long answer = plus;

        for (int index = 1; index < nums.length; ++index) {
            long value = nums[index];
            long newPlus = value;
            if (hasMinus) {
                newPlus = Math.max(newPlus, minus + value);
            }
            long newMinus = plus - value;

            answer = Math.max(answer, Math.max(newPlus, newMinus));
            plus = newPlus;
            minus = newMinus;
            hasMinus = true;
        }
        return answer;
    }
}
