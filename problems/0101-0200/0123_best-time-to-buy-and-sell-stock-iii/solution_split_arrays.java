class Solution {

    public int maxProfit(int[] prices) {
        // Split the timeline at day i: the first sale must close by i, the
        // second must open at or after it, so the best plan is the best sale
        // in prices[0..i] plus the best sale in prices[i..n-1]. Two
        // half-line scans tabulate those bests for every split at once.
        int n = prices.length;
        // Forward: bestPrefix[i] is the best single-sale profit over days
        // 0..i -- the running minimum buys and day i's price sells.
        int[] bestPrefix = new int[n];
        int minPrice = prices[0];
        for (int i = 1; i < n; i++) {
            minPrice = Math.min(minPrice, prices[i]);
            bestPrefix[i] = Math.max(bestPrefix[i - 1], prices[i] - minPrice);
        }
        // Backward: bestSuffix[i] is the best single-sale profit over days
        // i..n-1 -- day i's price buys and the running maximum sells.
        int[] bestSuffix = new int[n];
        int maxPrice = prices[n - 1];
        for (int i = n - 2; i >= 0; i--) {
            maxPrice = Math.max(maxPrice, prices[i]);
            bestSuffix[i] = Math.max(bestSuffix[i + 1], maxPrice - prices[i]);
        }
        // Both tables floor at 0, so an unused half of a split is a same-day
        // zero-profit sale -- Hint 3's placeholder -- and plans trading once
        // or never (split at n-1, where bestSuffix is 0) need no special
        // casing. A sale ending on the split day may share it with the next
        // purchase: selling and rebuying at one price is financially just
        // holding, so it never inflates the total.
        int best = 0;
        for (int i = 0; i < n; i++) {
            best = Math.max(best, bestPrefix[i] + bestSuffix[i]);
        }
        return best;
    }
}
