impl Solution {
    pub fn max_profit(prices: Vec<i32>, fee: i32) -> i64 {
        // total: profit already banked; basis: the fee-adjusted effective buy.
        // The sentinel opens beyond every price, so day one always sets the entry.
        let (mut total, mut basis) = (0i64, 1i64 << 60);
        for &price in prices.iter() {
            // A rise past basis + fee clears a round trip: bank the surplus and
            // rebate the fee into the next buy, so a further rise extends the
            // same trade instead of opening a billable new one.
            if (price as i64) > basis + fee as i64 {
                total += price as i64 - basis - fee as i64;
                basis = price as i64 - fee as i64;
            } else if (price as i64) < basis {
                // A dip below the basis is a strictly cheaper entry.
                basis = price as i64;
            }
        }
        // Only banked profit counts; the trailing basis is bookkeeping, not a position.
        total
    }
}
