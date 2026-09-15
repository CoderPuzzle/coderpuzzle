class Solution {
  public:
    vector<vector<int>> subsets(vector<int> &nums) {
        int n = nums.size();
        vector<vector<int>> subsets;
        // Count masks upward from all bits clear ([]) to all bits set (the
        // whole array): bit i set means nums[i] is in the subset.
        for (int mask = 0; mask < (1 << n); ++mask) {
            vector<int> current;
            for (int i = 0; i < n; ++i) {
                // Bit i set: nums[i] joins, in input order within the subset.
                if (mask & (1 << i)) {
                    current.push_back(nums[i]);
                }
            }
            subsets.push_back(current);
        }
        return subsets;
    }
};
