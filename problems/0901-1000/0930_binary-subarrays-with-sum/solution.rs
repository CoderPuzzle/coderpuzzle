use std::collections::HashMap;

impl Solution {
    pub fn num_subarrays_with_sum(nums: Vec<i32>, goal: i32) -> i32 {
        // A subarray's sum is the difference of two prefix sums, so the
        // windows ending here with sum goal pair exactly with the earlier
        // prefixes worth prefix - goal. A hash map counting each prefix sum
        // seen so far answers that lookup in O(1) per position.
        let mut count = 0i32;
        let mut prefix = 0i32;
        let mut seen: HashMap<i32, i32> = HashMap::new();
        seen.insert(0, 1);
        for &value in &nums {
            prefix += value;
            if let Some(&earlier) = seen.get(&(prefix - goal)) {
                count += earlier;
            }
            *seen.entry(prefix).or_insert(0) += 1;
        }
        count
    }
}
