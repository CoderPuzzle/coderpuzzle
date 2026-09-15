class Solution {
  public:
    long long maxProfit(vector<int> &prices, vector<int> &strategy, int k) {
        // Only one window can change: rewriting it forfeits the window's
        // current weighted sum and collects the price sum of its second
        // half. Prefix sums over prices and over strategy[i] * prices[i]
        // make both parts an O(1) lookup per window position. Sums reach
        // 10^10 in either direction, so everything widens to long long.
        int n = prices.size();
        long long base = 0;
        vector<long long> pricePrefix(n + 1, 0);
        vector<long long> weightedPrefix(n + 1, 0);
        for (int i = 0; i < n; ++i) {
            base += (long long)strategy[i] * prices[i];
            pricePrefix[i + 1] = pricePrefix[i] + prices[i];
            weightedPrefix[i + 1] = weightedPrefix[i] + (long long)strategy[i] * prices[i];
        }
        // At most one modification, so the untouched plan is always a candidate.
        long long best = base;
        int half = k / 2;
        for (int left = 0; left + k <= n; ++left) {
            int right = left + k;
            long long removed = weightedPrefix[right] - weightedPrefix[left];
            long long gained = pricePrefix[right] - pricePrefix[left + half];
            best = max(best, base - removed + gained);
        }
        return best;
    }
};
