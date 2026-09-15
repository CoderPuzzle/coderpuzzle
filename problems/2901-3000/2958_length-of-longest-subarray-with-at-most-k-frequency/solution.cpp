class Solution {
  public:
    int maxSubarrayLength(vector<int> &nums, int k) {
        // Expand the window rightward; only the entering value can break
        // goodness (its own count crosses k), so shrink from the left
        // until one copy of it falls out. Every index enters and leaves
        // the window once, making the whole scan linear.
        unordered_map<int, int> counts;
        int best = 0;
        int left = 0;
        for (int r = 0; r < (int)nums.size(); ++r) {
            ++counts[nums[r]];
            while (counts[nums[r]] > k) {
                if (--counts[nums[left]] == 0) {
                    counts.erase(nums[left]);
                }
                ++left;
            }
            best = max(best, r - left + 1);
        }
        return best;
    }
};
