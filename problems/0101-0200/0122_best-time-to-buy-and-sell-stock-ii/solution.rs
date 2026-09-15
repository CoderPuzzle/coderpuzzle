impl Solution {
    pub fn max_profit(prices: Vec<i32>) -> i32 {
        // Any optimal plan can bank every rise: selling the day before a fall
        // and buying back at the bottom is never worse than holding through
        // it, so the maximum profit is the sum of the positive daily deltas.
        let mut profit = 0;
        for day in 1..prices.len() {
            // Falling and flat days contribute nothing; a rising day is pocketed.
            if prices[day] > prices[day - 1] {
                profit += prices[day] - prices[day - 1];
            }
        }
        // A single price never enters the loop, so it correctly yields 0.
        profit
    }
}
