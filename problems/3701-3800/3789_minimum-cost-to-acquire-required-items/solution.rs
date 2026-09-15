impl Solution {
    pub fn minimum_cost(cost1: i32, cost2: i32, cost_both: i32, need1: i32, need2: i32) -> i64 {
        // Price each unit independently. A unit counted toward BOTH
        // requirements comes as one type 3 item or as one item of each
        // type, whichever is cheaper; a leftover unit of a single
        // requirement comes as that type's own item or as a type 3 item
        // whose spare contribution is wasted, whichever is cheaper.
        // Units never interact, so the per-unit minima sum to the global
        // minimum. Needs reach 1e9 against costs of 1e6, so totals pass
        // 2e15 and the 32-bit range -- every product accumulates in i64.
        let (cost1, cost2, cost_both) = (cost1 as i64, cost2 as i64, cost_both as i64);
        let (need1, need2) = (need1 as i64, need2 as i64);
        let pairs = need1.min(need2);
        let pair_cost = cost_both.min(cost1 + cost2);
        let rest1 = cost_both.min(cost1);
        let rest2 = cost_both.min(cost2);
        pairs * pair_cost + (need1 - pairs) * rest1 + (need2 - pairs) * rest2
    }
}
