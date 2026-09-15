class Solution {

    public int longestArithmetic(int[] nums) {
        // Every value is bounded by n <= 10^5, so int arithmetic carries
        // everything. left/right: longest run of equal consecutive
        // differences ending at i / starting at i (a pair counts as 2).
        int n = nums.length;
        int[] left = new int[n];
        int[] right = new int[n];
        java.util.Arrays.fill(left, 1);
        java.util.Arrays.fill(right, 1);
        for (int i = 1; i < n; i++) {
            if (i >= 2 && nums[i] - nums[i - 1] == nums[i - 1] - nums[i - 2]) {
                left[i] = left[i - 1] + 1;
            } else {
                left[i] = 2;
            }
        }
        for (int i = n - 2; i >= 0; i--) {
            if (i <= n - 3 && nums[i + 1] - nums[i] == nums[i + 2] - nums[i + 1]) {
                right[i] = right[i + 1] + 1;
            } else {
                right[i] = 2;
            }
        }
        int best = 0;
        for (int value : left) {
            best = Math.max(best, value);
        }
        // Replacing nums[p] either stops the subarray at p (extending the
        // run on one side) or spans p, gluing a left run to a right run
        // whose common difference is forced to (nums[p+1]-nums[p-1])/2.
        for (int p = 0; p < n; p++) {
            if (p >= 1) {
                best = Math.max(best, left[p - 1] + 1);
            }
            if (p <= n - 2) {
                best = Math.max(best, right[p + 1] + 1);
            }
            if (1 <= p && p <= n - 2) {
                int diff = nums[p + 1] - nums[p - 1];
                if (diff % 2 == 0) {
                    int d = diff / 2;
                    int leftLen = p >= 2 && nums[p - 1] - nums[p - 2] == d ? left[p - 1] : 1;
                    int rightLen = p <= n - 3 && nums[p + 2] - nums[p + 1] == d ? right[p + 1] : 1;
                    best = Math.max(best, leftLen + rightLen + 1);
                }
            }
        }
        return best;
    }
}
