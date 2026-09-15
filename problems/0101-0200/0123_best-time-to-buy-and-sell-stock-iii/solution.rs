impl Solution {
    pub fn max_profit(prices: Vec<i32>) -> i32 {
        // Wealth after each day in four states: after the first buy, first
        // sell, second buy, second sell. Buy states start at -1e9, a
        // sentinel meaning "not yet reachable" (prices are at most 1e5, so
        // no real debt is that deep); sell states start at 0 = never traded.
        let (mut buy1, mut sell1) = (-1_000_000_000, 0);
        let (mut buy2, mut sell2) = (-1_000_000_000, 0);
        for &price in prices.iter() {
            // Each state either keeps yesterday's value or transitions
            // today: buying adds -price, selling adds +price, on top of
            // the preceding state.
            // the cheapest first buy so far
            buy1 = buy1.max(-price);
            sell1 = sell1.max(buy1 + price);
            buy2 = buy2.max(sell1 - price);
            sell2 = sell2.max(buy2 + price);
        }
        // Each update reads the already-updated earlier states, so a
        // same-day buy-and-sell is allowed -- a zero-profit degenerate
        // transaction stands in for "do nothing", removing any need for a
        // transaction-count dimension. Hence sell2 >= sell1 >= 0 always,
        // and sell2 is correct even for plans using fewer transactions.
        sell2
    }
}
