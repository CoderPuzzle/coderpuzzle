class Solution {
  public:
    int longestArithSeqLength(vector<int> &nums) {
        int n = nums.size();
        vector<unordered_map<int, int>> dp(n);
        int best = 1;
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < i; j++) {
                int d = nums[i] - nums[j];
                auto it = dp[j].find(d);
                int length = (it == dp[j].end() ? 1 : it->second) + 1;
                int &slot = dp[i][d];
                if (length > slot) {
                    slot = length;
                    if (length > best) {
                        best = length;
                    }
                }
            }
        }
        return best;
    }
};
