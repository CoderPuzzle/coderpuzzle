impl Solution {
    pub fn max_profit(prices: Vec<i32>) -> i32 {
        // Every sale is fixed by two days: the day it sells and the cheapest
        // day before it, so one pass folding two values answers everything.
        let mut cheapest = prices[0];
        let mut best = 0;
        for &price in &prices {
            // The cheapest prefix so far; on the day it drops to price
            // itself, price - cheapest is 0, so a day can never sell to itself.
            cheapest = cheapest.min(price);
            best = best.max(price - cheapest);
        }
        best
    }
}
