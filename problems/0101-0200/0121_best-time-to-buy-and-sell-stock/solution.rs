impl Solution {
    pub fn max_profit(prices: Vec<i32>) -> i32 {
        // best seeds at 0: the profit of never trading. min_price tracks the
        // cheapest buy seen so far, so each day needs only one candidate --
        // sell today against it -- instead of testing every buy/sell pair.
        let mut best = 0;
        let mut min_price = prices[0];
        for &price in &prices {
            if price < min_price {
                min_price = price;
            } else if price - min_price > best {
                // The else-if is safe: a new-minimum price yields a
                // non-positive profit, which can never beat `best` (always
                // non-negative). Since min_price only draws from
                // current-or-earlier days, buy-before-sell holds automatically.
                best = price - min_price;
            }
        }
        best
    }
}
