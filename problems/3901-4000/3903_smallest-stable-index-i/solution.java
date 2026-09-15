class Solution {

    public int firstStableIndex(int[] nums, int k) {
        for (int i = 0; i < nums.length; i++) {
            int prefixMax = nums[0];
            for (int j = 1; j <= i; j++) {
                prefixMax = Math.max(prefixMax, nums[j]);
            }

            int suffixMin = nums[i];
            for (int j = i + 1; j < nums.length; j++) {
                suffixMin = Math.min(suffixMin, nums[j]);
            }

            if (prefixMax - suffixMin <= k) {
                return i;
            }
        }
        return -1;
    }
}
