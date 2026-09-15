use std::collections::HashMap;

impl Solution {
    pub fn find_target_sum_ways(nums: Vec<i32>, target: i32) -> i32 {
        // dp maps each reachable running sum to the number of sign
        // assignments producing it; one way to stand at 0 before any number.
        let mut dp: HashMap<i32, i64> = HashMap::new();
        dp.insert(0, 1);
        for &value in &nums {
            // Each reachable total branches into +value and -value;
            // identical totals merge and their counts add, so the map
            // stays bounded by distinct sums, not 2^i.
            let mut nxt: HashMap<i32, i64> = HashMap::new();
            for (&total, &count) in &dp {
                *nxt.entry(total + value).or_insert(0) += count;
                *nxt.entry(total - value).or_insert(0) += count;
            }
            dp = nxt;
        }
        dp.get(&target).copied().unwrap_or(0) as i32
    }
}
