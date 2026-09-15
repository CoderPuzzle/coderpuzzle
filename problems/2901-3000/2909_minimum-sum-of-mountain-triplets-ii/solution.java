class Solution {

    public int minimumSum(int[] nums) {
        // For a fixed peak j the best i is the smallest value left of j and
        // the best k the smallest value right of j, so prefix and suffix
        // minima settle both sides in one array each.
        int n = nums.length;
        int[] prefixMin = new int[n];
        int[] suffixMin = new int[n];
        prefixMin[0] = nums[0];
        for (int i = 1; i < n; ++i) {
            prefixMin[i] = Math.min(prefixMin[i - 1], nums[i]);
        }
        suffixMin[n - 1] = nums[n - 1];
        for (int i = n - 2; i >= 0; --i) {
            suffixMin[i] = Math.min(suffixMin[i + 1], nums[i]);
        }
        // Every interior index is tried as the peak; the strict inequalities
        // guard against equal shoulders, and -1 survives when none qualifies.
        int best = -1;
        for (int j = 1; j + 1 < n; ++j) {
            int left = prefixMin[j - 1];
            int right = suffixMin[j + 1];
            if (left < nums[j] && right < nums[j]) {
                int total = left + nums[j] + right;
                if (best == -1 || total < best) {
                    best = total;
                }
            }
        }
        return best;
    }
}
