use std::collections::HashSet;

impl Solution {
    pub fn find_max_k(nums: Vec<i32>) -> i32 {
        // A positive k is valid exactly when -k sits in the same array, so
        // membership is the whole question -- drop every value into a hash
        // set once, then scan for the largest positive whose negation is
        // present. Values are nonzero by the constraints, so no value can
        // be its own partner.
        let seen: HashSet<i32> = nums.iter().copied().collect();
        let mut best = -1;
        for &value in nums.iter() {
            if value > 0 && seen.contains(&-value) && value > best {
                best = value;
            }
        }
        best
    }
}
