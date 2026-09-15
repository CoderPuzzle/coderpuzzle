class Solution {
  public:
    int maximumProfit(vector<int> &present, vector<int> &future, int budget) {
        vector<int> dp(budget + 1, 0);
        for (int i = 0; i < static_cast<int>(present.size()); i++) {
            int price = present[i];
            int gain = future[i] - price;
            if (gain <= 0) {
                continue;
            }
            for (int money = budget; money >= price; money--) {
                dp[money] = max(dp[money], dp[money - price] + gain);
            }
        }
        return dp[budget];
    }
};
