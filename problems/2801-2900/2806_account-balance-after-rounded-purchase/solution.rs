impl Solution {
    pub fn account_balance_after_purchase(purchaseAmount: i32) -> i32 {
        // Adding 5 before flooring to a multiple of 10 encodes the half-up
        // rounding rule: a ones digit of 0-4 stays on the lower multiple,
        // 6-9 crosses to the upper one, and an exact 5 lands on the upper
        // neighbor -- the larger of the two equally distant candidates.
        let rounded = (purchaseAmount + 5) / 10 * 10;
        // Every intermediate stays non-negative on the constraint domain.
        100 - rounded
    }
}
