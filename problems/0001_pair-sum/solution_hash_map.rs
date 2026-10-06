use std::collections::HashMap;

impl Solution {
    pub fn pair_sum(nums: Vec<i32>, target: i32) -> Vec<i32> {
        // Hash map from value -> index: one pass answers "seen the complement?"
        // in O(1), replacing the nested brute-force scan.
        let mut seen = HashMap::new();
        for (index, value) in nums.iter().enumerate() {
            // Look up before inserting, so an element can never match itself
            // and the two returned indices are guaranteed distinct.
            if let Some(&earlier) = seen.get(&(target - value)) {
                return vec![earlier as i32, index as i32];
            }
            seen.insert(value, index);
        }
        Vec::new()
    }
}
