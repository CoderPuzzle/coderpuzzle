class Solution {

    public int countPairs(int[] nums, int k) {
        // n <= 100, so the direct double loop over index pairs is the
        // whole story: equal values and (i * j) % k == 0.
        int count = 0;
        int n = nums.length;
        for (int i = 0; i < n; ++i) {
            for (int j = i + 1; j < n; ++j) {
                if (nums[i] == nums[j] && (i * j) % k == 0) {
                    ++count;
                }
            }
        }
        return count;
    }
}
