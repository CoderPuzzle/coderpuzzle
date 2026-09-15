impl Solution {
    pub fn min_cost_climbing_stairs(cost: Vec<i32>) -> i32 {
        // Rolling states: cheapest total cost to be standing on each step.
        // Both start at 0 — the starting step is free to choose.
        let (mut prev2, mut prev1) = (0i64, 0i64);
        for &c in &cost {
            // Arrive from i-1 or i-2, paying this step's cost on the hop.
            let cur = c as i64 + prev1.min(prev2);
            prev2 = prev1;
            prev1 = cur;
        }
        // The top is one final paid hop from the last or second-to-last step.
        prev1.min(prev2) as i32
    }
}
