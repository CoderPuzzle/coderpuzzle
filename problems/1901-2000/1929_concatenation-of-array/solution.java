class Solution {

    public int[] getConcatenation(int[] nums) {
        // ans is nums followed by a second copy of nums: each value lands at
        // index i and again at index i + n.
        int n = nums.length;
        int[] ans = new int[2 * n];
        for (int i = 0; i < n; ++i) {
            ans[i] = nums[i];
            ans[i + n] = nums[i];
        }
        return ans;
    }
}
