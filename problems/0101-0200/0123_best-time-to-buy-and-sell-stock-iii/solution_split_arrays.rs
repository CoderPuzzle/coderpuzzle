impl Solution {
    pub fn max_profit(prices: Vec<i32>) -> i32 {
        // Split the timeline at day i: the first sale must close by i, the
        // second must open at or after it, so the best plan is the best sale
        // in prices[0..i] plus the best sale in prices[i..n-1]. Two
        // half-line scans tabulate those bests for every split at once.
        let n = prices.len();
        // Forward: best_prefix[i] is the best single-sale profit over days
        // 0..i -- the running minimum buys and day i's price sells.
        let mut best_prefix = vec![0; n];
        let mut min_price = prices[0];
        for i in 1..n {
            min_price = min_price.min(prices[i]);
            best_prefix[i] = best_prefix[i - 1].max(prices[i] - min_price);
        }
        // Backward: best_suffix[i] is the best single-sale profit over days
        // i..n-1 -- day i's price buys and the running maximum sells.
        let mut best_suffix = vec![0; n];
        let mut max_price = prices[n - 1];
        for i in (0..n - 1).rev() {
            max_price = max_price.max(prices[i]);
            best_suffix[i] = best_suffix[i + 1].max(max_price - prices[i]);
        }
        // Both tables floor at 0, so an unused half of a split is a same-day
        // zero-profit sale -- Hint 3's placeholder -- and plans trading once
        // or never (split at n-1, where best_suffix is 0) need no special
        // casing. A sale ending on the split day may share it with the next
        // purchase: selling and rebuying at one price is financially just
        // holding, so it never inflates the total.
        let mut best = 0;
        for i in 0..n {
            best = best.max(best_prefix[i] + best_suffix[i]);
        }
        best
    }
}
