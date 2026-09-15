class Solution {

    public int minimumSum(int[] nums) {
        // The best mountain through a peak j pairs nums[j] with the smallest
        // value on each side, so running minima from both ends bracket every
        // candidate; both side values must sit strictly below the peak.
        int n = nums.length;
        int[] leftMin = nums.clone();
        for (int i = 1; i < n; ++i) {
            leftMin[i] = Math.min(leftMin[i - 1], nums[i]);
        }
        int[] rightMin = nums.clone();
        for (int i = n - 2; i >= 0; --i) {
            rightMin[i] = Math.min(rightMin[i + 1], nums[i]);
        }
        int best = -1;
        for (int j = 1; j < n - 1; ++j) {
            int low = leftMin[j - 1];
            int high = rightMin[j + 1];
            if (low < nums[j] && high < nums[j]) {
                int total = low + nums[j] + high;
                if (best == -1 || total < best) {
                    best = total;
                }
            }
        }
        return best;
    }
}
