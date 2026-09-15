class Solution {

    public int countKDifference(int[] nums, int k) {
        int pairs = 0;
        for (int first = 0; first < nums.length; ++first) {
            for (int second = first + 1; second < nums.length; ++second) {
                if (Math.abs(nums[first] - nums[second]) == k) {
                    ++pairs;
                }
            }
        }
        return pairs;
    }
}
