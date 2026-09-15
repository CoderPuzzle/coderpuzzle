impl Solution {
    pub fn equal_substring(s: String, t: String, max_cost: i32) -> i32 {
        // cost[i] = |s[i] - t[i]|; find the longest subarray of costs whose
        // sum stays at most maxCost. A sliding window keeps one pass.
        let costs: Vec<i32> = s
            .bytes()
            .zip(t.bytes())
            .map(|(a, b)| (a as i32 - b as i32).abs())
            .collect();
        let mut left = 0usize;
        let mut window_cost = 0i32;
        let mut best = 0usize;
        for right in 0..costs.len() {
            window_cost += costs[right];
            // Non-negative costs: shrink from the left until affordable.
            while window_cost > max_cost {
                window_cost -= costs[left];
                left += 1;
            }
            best = best.max(right - left + 1);
        }
        best as i32
    }
}
