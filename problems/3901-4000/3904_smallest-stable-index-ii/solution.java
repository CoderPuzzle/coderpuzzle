class Solution {

    public int firstStableIndex(int[] nums, int k) {
        int[] suffixMin = nums.clone();
        for (int i = nums.length - 2; i >= 0; i--) {
            suffixMin[i] = Math.min(nums[i], suffixMin[i + 1]);
        }

        int prefixMax = nums[0];
        for (int i = 0; i < nums.length; i++) {
            prefixMax = Math.max(prefixMax, nums[i]);
            if (prefixMax - suffixMin[i] <= k) {
                return i;
            }
        }
        return -1;
    }
}
