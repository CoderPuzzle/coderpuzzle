impl Solution {
    pub fn max_profit(k: i32, prices: Vec<i32>) -> i64 {
        let n = prices.len();
        if n < 2 || k == 0 {
            return 0;
        }
        let k = k as usize;
        if k >= n / 2 {
            // The limit can never bind: sum every upward move.
            let mut total: i64 = 0;
            for i in 1..n {
                let diff = prices[i] - prices[i - 1];
                if diff > 0 {
                    total += diff as i64;
                }
            }
            return total;
        }
        let neg = -(1i64 << 60);
        // buy[j]: best cash while holding the j-th buy; sell[j]: best profit
        // after j completed sells. neg marks impossible holdings.
        let mut buy = vec![neg; k + 1];
        let mut sell = vec![0i64; k + 1];
        for &price in &prices {
            for j in 1..=k {
                // Keep holding, or buy now out of j-1 finished transactions.
                buy[j] = buy[j].max(sell[j - 1] - price as i64);
                // Stay sold, or sell the held position at today's price.
                // Updating buy first permits a same-day buy-then-sell, which
                // is a zero-profit transaction and never harms optimality.
                sell[j] = sell[j].max(buy[j] + price as i64);
            }
        }
        // sell[k] is the best profit with at most k transactions.
        sell[k]
    }
}
