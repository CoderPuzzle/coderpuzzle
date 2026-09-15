class Solution {
  public:
    int maxSelectedElements(vector<int> &nums) {
        sort(nums.begin(), nums.end());
        unordered_map<int, int> dp;
        int best = 0;
        for (int a : nums) {
            int up = max(dp[a + 1], dp[a] + 1);
            int stay = max(dp[a], dp[a - 1] + 1);
            dp[a + 1] = up;
            dp[a] = stay;
            best = max({best, up, stay});
        }
        return best;
    }
};
