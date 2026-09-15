class Solution {
  public:
    int minimumSum(vector<int> &nums) {
        // The best mountain through a peak j pairs nums[j] with the smallest
        // value on each side, so running minima from both ends bracket every
        // candidate; both side values must sit strictly below the peak.
        int n = (int)nums.size();
        vector<int> leftMin = nums;
        for (int i = 1; i < n; ++i) {
            leftMin[i] = min(leftMin[i - 1], nums[i]);
        }
        vector<int> rightMin = nums;
        for (int i = n - 2; i >= 0; --i) {
            rightMin[i] = min(rightMin[i + 1], nums[i]);
        }
        int best = -1;
        for (int j = 1; j < n - 1; ++j) {
            int low = leftMin[j - 1], high = rightMin[j + 1];
            if (low < nums[j] && high < nums[j]) {
                int total = low + nums[j] + high;
                if (best == -1 || total < best) {
                    best = total;
                }
            }
        }
        return best;
    }
};
