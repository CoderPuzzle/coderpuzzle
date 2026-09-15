class Solution {

    public int minSwaps(int[] nums) {
        int n = nums.length;
        int ones = 0;
        for (int value : nums) ones += value;
        int windowOnes = 0;
        for (int index = 0; index < ones; index++) windowOnes += nums[index];
        int best = windowOnes;
        for (int start = 1; start < n; start++) {
            windowOnes -= nums[start - 1];
            windowOnes += nums[(start + ones - 1) % n];
            best = Math.max(best, windowOnes);
        }
        return ones - best;
    }
}
