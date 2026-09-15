impl Solution {
    pub fn min_price(mut prices: Vec<i32>, mut discounts: Vec<i32>) -> f64 {
        // Sort both descending and pair positionally: by the exchange
        // argument, largest discount on largest price maximizes p*d/100.
        prices.sort_unstable_by(|a, b| b.cmp(a));
        discounts.sort_unstable_by(|a, b| b.cmp(a));
        let mut saved: i64 = 0;
        let mut total: i64 = 0;
        for (index, &price) in prices.iter().enumerate() {
            total += i64::from(price);
            if let Some(&discount) = discounts.get(index) {
                saved += i64::from(price) * i64::from(discount);
            }
        }
        // The product sum reaches 1e12 in the i64; dividing once yields
        // the correctly rounded double of the rational total.
        (total * 100 - saved) as f64 / 100.0
    }
}
