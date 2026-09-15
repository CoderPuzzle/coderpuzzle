impl Solution {
    pub fn max_profit(prices: Vec<i32>, strategy: Vec<i32>, k: i32) -> i64 {
        // Only one window can change: rewriting it forfeits the window's
        // current weighted sum and collects the price sum of its second
        // half. Prefix sums over prices and over strategy[i] * prices[i]
        // make both parts an O(1) lookup per window position. Sums reach
        // 10^10 in either direction, so everything widens to i64.
        let n = prices.len();
        let mut base: i64 = 0;
        let mut price_prefix = vec![0i64; n + 1];
        let mut weighted_prefix = vec![0i64; n + 1];
        for i in 0..n {
            base += strategy[i] as i64 * prices[i] as i64;
            price_prefix[i + 1] = price_prefix[i] + prices[i] as i64;
            weighted_prefix[i + 1] = weighted_prefix[i] + strategy[i] as i64 * prices[i] as i64;
        }
        // At most one modification, so the untouched plan is always a candidate.
        let mut best = base;
        let window = k as usize;
        let half = window / 2;
        for left in 0..=(n - window) {
            let right = left + window;
            let removed = weighted_prefix[right] - weighted_prefix[left];
            let gained = price_prefix[right] - price_prefix[left + half];
            best = best.max(base - removed + gained);
        }
        best
    }
}
