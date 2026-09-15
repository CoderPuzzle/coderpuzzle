impl Solution {
    pub fn max_profit(prices: Vec<i32>, fee: i32) -> i64 {
        // cash: best profit holding no share; hold: best profit holding one.
        // The sentinel makes pre-day-1 holding unreachable; cash=0 means do nothing.
        let (mut cash, mut hold) = (0i64, -(1i64 << 60));
        for &price in prices.iter() {
            // Both maxes read yesterday's values: sell charges the fee once,
            // on the sell leg; buy subtracts the price.
            let new_cash = cash.max(hold + price as i64 - fee as i64);
            let new_hold = hold.max(cash - price as i64);
            cash = new_cash;
            hold = new_hold;
        }
        // Ending with a share in hand is never better than having sold.
        cash
    }
}
