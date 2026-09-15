impl Solution {
    pub fn max_number_of_alloys(
        n: i32,
        k: i32,
        budget: i32,
        composition: Vec<Vec<i32>>,
        stock: Vec<i32>,
        cost: Vec<i32>,
    ) -> i32 {
        // Binary search the alloy count. Making x alloys on one machine
        // costs sum(max(0, x * composition[m][j] - stock[j]) * cost[j])
        // coins, which never decreases as x grows, so affordability is
        // monotone and the largest feasible count can be bisected. The
        // count is bounded by min(stock) + budget: the metal with the
        // smallest stock needs at least x - stock[j] units bought and any
        // unit costs at least one coin. Every machine is probed per
        // candidate count; the spend total reaches about 2e12, wider
        // than 32-bit, so it is accumulated in i64.
        let affordable = |machine: &Vec<i32>, count: i64| -> bool {
            let mut spent: i64 = 0;
            for j in 0..n as usize {
                let need = count * machine[j] as i64 - stock[j] as i64;
                if need > 0 {
                    spent += need * cost[j] as i64;
                    if spent > budget as i64 {
                        return false;
                    }
                }
            }
            true
        };
        let mut min_stock = i32::MAX;
        for s in stock.iter() {
            min_stock = min_stock.min(*s);
        }
        let mut best: i64 = 0;
        let mut low: i64 = 0;
        let mut high: i64 = min_stock as i64 + budget as i64;
        while low <= high {
            let mid = low + (high - low) / 2;
            let mut ok = false;
            for m in 0..k as usize {
                if affordable(&composition[m], mid) {
                    ok = true;
                    break;
                }
            }
            if ok {
                best = mid;
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }
        best as i32
    }
}
