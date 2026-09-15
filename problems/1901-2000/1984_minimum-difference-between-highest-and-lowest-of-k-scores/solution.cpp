class Solution {
  public:
    int minimumDifference(vector<int> &nums, int k) {
        // Sort so the k chosen students form a contiguous window; the span
        // of that window is its highest minus lowest score.
        sort(nums.begin(), nums.end());
        int best = nums[k - 1] - nums[0];
        for (int i = k; i < (int)nums.size(); ++i) {
            best = min(best, nums[i] - nums[i - k + 1]);
        }
        return best;
    }
};
