class Solution {

    public int dominantIndex(int[] nums) {
        // One pass for the top two values: the largest dominates exactly when
        // it is at least twice the runner-up, since every other element is at
        // most that runner-up.
        int best = 0;
        int second = -1;
        for (int i = 1; i < nums.length; ++i) {
            if (nums[i] > nums[best]) {
                second = nums[best];
                best = i;
            } else if (nums[i] > second) {
                second = nums[i];
            }
        }
        // The boundary is inclusive: "at least twice" keeps max == 2 * second.
        return nums[best] >= 2 * second ? best : -1;
    }
}
