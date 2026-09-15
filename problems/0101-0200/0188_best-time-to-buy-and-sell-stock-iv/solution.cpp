class Solution {
  public:
    long long maxProfit(int k, vector<int> &prices) {
        int n = (int)prices.size();
        if (n < 2 || k == 0)
            return 0;
        if (k >= n / 2) {
            // The limit can never bind: sum every upward move.
            long long total = 0;
            for (int i = 1; i < n; i++) {
                int diff = prices[i] - prices[i - 1];
                if (diff > 0)
                    total += diff;
            }
            return total;
        }
        const long long neg = -(1LL << 60);
        // buy[j]: best cash while holding the j-th buy; sell[j]: best profit
        // after j completed sells. neg marks impossible holdings.
        vector<long long> buy(k + 1, neg), sell(k + 1, 0);
        for (int price : prices) {
            for (int j = 1; j <= k; j++) {
                // Keep holding, or buy now out of j-1 finished transactions.
                buy[j] = max(buy[j], sell[j - 1] - price);
                // Stay sold, or sell the held position at today's price.
                // Updating buy first permits a same-day buy-then-sell, which
                // is a zero-profit transaction and never harms optimality.
                sell[j] = max(sell[j], buy[j] + price);
            }
        }
        // sell[k] is the best profit with at most k transactions.
        return sell[k];
    }
};
