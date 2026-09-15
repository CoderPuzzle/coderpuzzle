class Solution {
  public:
    vector<int> minSubsequence(vector<int> &nums) {
        // The chosen subsequence must sum to more than half the total.
        // Every element is positive, so taking the largest elements first
        // yields the minimum size and, per size, the maximum sum.
        sort(nums.rbegin(), nums.rend());
        int total = 0;
        for (int value : nums) {
            total += value;
        }
        int running = 0;
        for (int i = 0; i < static_cast<int>(nums.size()); ++i) {
            running += nums[i];
            if (running * 2 > total) {
                return vector<int>(nums.begin(), nums.begin() + i + 1);
            }
        }
        return nums;
    }
};
