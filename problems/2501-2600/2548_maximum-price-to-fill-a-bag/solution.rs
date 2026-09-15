impl Solution {
    pub fn max_price(items: Vec<Vec<i32>>, capacity: i32) -> f64 {
        let total_weight: i64 = items.iter().map(|it| it[1] as i64).sum();
        // Divisibility makes this fractional knapsack: moving a unit of weight
        // from a cheaper to a dearer price-per-weight item never lowers the
        // total, so a greedy fill in unit-price order is optimal. If even all
        // items together weigh less than the bag, no packing can fill it.
        if total_weight < capacity as i64 {
            return -1.0;
        }
        // Stable sort by price-per-weight ratio, descending.
        let mut ordered = items;
        ordered.sort_by(|a, b| {
            let ra = a[0] as f64 / a[1] as f64;
            let rb = b[0] as f64 / b[1] as f64;
            rb.partial_cmp(&ra).unwrap()
        });
        let mut price = 0.0f64;
        let mut remaining = capacity as i64;
        for item in &ordered {
            if remaining <= 0 {
                break;
            }
            let (p, w) = (item[0] as i64, item[1] as i64);
            if w <= remaining {
                price += p as f64;
                remaining -= w;
            } else {
                // First item heavier than what remains: take just the
                // fraction remaining/w of it — the only floating-point step.
                price += (p as f64) * ((remaining as f64) / (w as f64));
                remaining = 0;
            }
        }
        price
    }
}
