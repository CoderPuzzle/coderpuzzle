class Solution {

    public int sumOfDigits(int[] nums) {
        // The answer depends only on the smallest element; sum its digits
        // by peeling off the least significant digit one at a time.
        int m = nums[0];
        for (int i = 1; i < nums.length; i++) {
            if (nums[i] < m) m = nums[i];
        }
        int digitSum = 0;
        while (m > 0) {
            digitSum += m % 10;
            m /= 10;
        }
        return digitSum % 2 != 0 ? 0 : 1;
    }
}
