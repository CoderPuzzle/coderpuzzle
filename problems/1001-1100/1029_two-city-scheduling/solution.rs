impl Solution {
    pub fn two_city_sched_cost(costs: Vec<Vec<i32>>) -> i32 {
        // Switching person i from B to A changes the total by a_i - b_i alone,
        // so the cheapest plan applies the n smallest differences.
        let mut ordered = costs.clone();
        ordered.sort_by_key(|cost| cost[0] - cost[1]);
        // First half (most negative differences) flies A, rest fly B — the
        // split satisfies the half/half count structurally.
        let n = ordered.len() / 2;
        let mut total = 0;
        for (i, cost) in ordered.iter().enumerate() {
            total += if i < n { cost[0] } else { cost[1] };
        }
        total
    }
}
