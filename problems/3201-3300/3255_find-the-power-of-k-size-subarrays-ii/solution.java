class Solution {

    public int[] resultsArray(int[] nums, int k) {
        int n = nums.length;
        int[] results = new int[n - k + 1];
        int run = 1;
        for (int i = 0; i < n; i++) {
            if (i > 0 && nums[i] == nums[i - 1] + 1) {
                run++;
            } else {
                run = 1;
            }
            if (i >= k - 1) {
                results[i - k + 1] = run >= k ? nums[i] : -1;
            }
        }
        return results;
    }
}
