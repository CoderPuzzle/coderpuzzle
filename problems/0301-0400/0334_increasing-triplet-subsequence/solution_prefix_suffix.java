class Solution {

    public boolean increasingTriplet(int[] nums) {
        int n = nums.length;
        if (n < 3) {
            return false;
        }
        // leftMin[j]: smallest value strictly before j; rightMax[j]:
        // largest value strictly after j. The sentinel ends can never
        // satisfy the check, so every position tests uniformly.
        long[] leftMin = new long[n];
        long[] rightMax = new long[n];
        leftMin[0] = Long.MAX_VALUE;
        for (int j = 1; j < n; ++j) {
            leftMin[j] = Math.min(leftMin[j - 1], nums[j - 1]);
        }
        rightMax[n - 1] = Long.MIN_VALUE;
        for (int j = n - 2; j >= 0; --j) {
            rightMax[j] = Math.max(rightMax[j + 1], nums[j + 1]);
        }
        for (int j = 0; j < n; ++j) {
            if (leftMin[j] < nums[j] && nums[j] < rightMax[j]) {
                return true;
            }
        }
        return false;
    }
}
