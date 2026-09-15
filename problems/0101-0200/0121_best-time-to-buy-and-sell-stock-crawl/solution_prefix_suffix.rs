impl Solution {
    pub fn max_profit(prices: Vec<i32>) -> i32 {
        let n = prices.len();
        // Every trade straddles some day i -- bought on or before it, sold
        // strictly after -- so each split can be scored on its own: the
        // cheapest buy anywhere in the prefix against the dearest sale
        // still to come in the suffix. Tabulate the future first, then
        // sweep the past against it.
        let mut best_sale = vec![0; n];
        best_sale[n - 1] = prices[n - 1];
        for i in (0..n - 1).rev() {
            best_sale[i] = best_sale[i + 1].max(prices[i]);
        }
        let mut best = 0; // the profit of never trading
        let mut cheapest = prices[0];
        for i in 0..n - 1 {
            cheapest = cheapest.min(prices[i]);
            // The split guarantees the sale day falls after the buy day,
            // so every candidate is a legal trade, never the same day
            // bought and sold.
            if best_sale[i + 1] - cheapest > best {
                best = best_sale[i + 1] - cheapest;
            }
        }
        best
    }
}
