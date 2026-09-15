impl Solution {
    pub fn max_profit(prices: Vec<i32>) -> i32 {
        // End-of-day states: hold (own a share), sold (just sold today),
        // rest (own nothing, free to buy). The sentinel makes owning a
        // share before any purchase impossible.
        let (mut hold, mut sold, mut rest) = (-1_000_000_000, 0, 0);
        for &price in prices.iter() {
            // Cache yesterday's sold first: rest may only absorb a sale
            // made the day before, which is the cooldown.
            let prev_sold = sold;
            // Keep the share, or buy at today's price from yesterday's
            // rest wealth (rest is rewritten after this read).
            hold = hold.max(rest - price);
            // Sell into today's price.
            sold = hold + price;
            // Stay at rest or absorb the cached sale; since it is
            // yesterday's, the earliest rebuy is two days after selling.
            rest = rest.max(prev_sold);
        }
        // Ending while holding is worthless: an unsold purchase only
        // ever subtracted from wealth.
        sold.max(rest)
    }
}
