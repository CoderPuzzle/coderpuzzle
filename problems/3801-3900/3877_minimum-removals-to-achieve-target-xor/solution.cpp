class Solution {
  public:
    int minRemovals(vector<int> &nums, int target) {
        // dp[xor] = maximum number of elements we can KEEP with XOR == xor
        unordered_map<int, int> dp;
        dp[0] = 0;
        for (int x : nums) {
            vector<pair<int, int>> snapshot(dp.begin(), dp.end());
            for (auto &[xorVal, count] : snapshot) {
                int nx = xorVal ^ x;
                auto it = dp.find(nx);
                if (it == dp.end() || count + 1 > it->second) {
                    dp[nx] = count + 1;
                }
            }
        }
        auto it = dp.find(target);
        if (it != dp.end()) {
            return (int)nums.size() - it->second;
        }
        return -1;
    }
};
