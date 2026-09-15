class Solution {
  public:
    int minimumCoins(vector<int> &prices) {
        int n = (int)prices.size();
        vector<long long> dp(n + 1, 0);
        deque<int> dq;

        auto value = [&](int l) -> long long { return dp[l - 1] + prices[l - 1]; };

        for (int i = 1; i <= n; i++) {
            while (!dq.empty() && value(dq.back()) >= value(i)) {
                dq.pop_back();
            }
            dq.push_back(i);
            int lo = (i + 1) / 2; // ceil(i / 2)
            while (!dq.empty() && dq.front() < lo) {
                dq.pop_front();
            }
            dp[i] = value(dq.front());
        }
        return (int)dp[n];
    }
};
