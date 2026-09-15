class Solution {
  public:
    int maxValueOfCoins(vector<vector<int>> &piles, int k) {
        // dp[j]: best value using exactly j coins from the piles seen so far
        vector<int> dp(k + 1, 0);
        for (auto &pile : piles) {
            // taking t coins from a pile means its top t: prefix[t]
            vector<int> prefix(1, 0);
            prefix.reserve(pile.size() + 1);
            for (int coin : pile) {
                prefix.push_back(prefix.back() + coin);
            }
            // t stays within both the pile's size and the budget
            int takeMax = min((int)pile.size(), k);
            // fresh row so transitions only read the previous pile's dp
            vector<int> ndp(k + 1, 0);
            for (int j = 0; j <= k; j++) {
                // t = 0 case: skip this pile entirely
                int value = dp[j];
                int lim = min(takeMax, j);
                for (int t = 1; t <= lim; t++) {
                    int cand = dp[j - t] + prefix[t];
                    if (cand > value)
                        value = cand;
                }
                ndp[j] = value;
            }
            dp = ndp;
        }
        // coin values are positive, so using all k coins is never worse
        return dp[k];
    }
};
