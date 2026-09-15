class Solution {

    public long maxProfit(int[] prices, int[] strategy, int k) {
        // Only one window can change: rewriting it forfeits the window's
        // current weighted sum and collects the price sum of its second
        // half. Prefix sums over prices and over strategy[i] * prices[i]
        // make both parts an O(1) lookup per window position. Sums reach
        // 10^10 in either direction, so everything widens to long.
        int n = prices.length;
        long base = 0;
        long[] pricePrefix = new long[n + 1];
        long[] weightedPrefix = new long[n + 1];
        for (int i = 0; i < n; ++i) {
            base += (long) strategy[i] * prices[i];
            pricePrefix[i + 1] = pricePrefix[i] + prices[i];
            weightedPrefix[i + 1] = weightedPrefix[i] + (long) strategy[i] * prices[i];
        }
        // At most one modification, so the untouched plan is always a candidate.
        long best = base;
        int half = k / 2;
        for (int left = 0; left + k <= n; ++left) {
            int right = left + k;
            long removed = weightedPrefix[right] - weightedPrefix[left];
            long gained = pricePrefix[right] - pricePrefix[left + half];
            best = Math.max(best, base - removed + gained);
        }
        return best;
    }
}
