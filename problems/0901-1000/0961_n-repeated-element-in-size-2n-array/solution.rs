use std::collections::HashSet;

impl Solution {
    pub fn repeated_n_times(nums: Vec<i32>) -> i32 {
        // All but one value occurs exactly once, so the first value to appear
        // a second time can only be the one repeated n times. One pass keeps
        // a hash set of the values met so far and returns the moment the
        // current value is already a member; the n copies guarantee that
        // collision happens before the scan ends.
        let mut seen = HashSet::new();
        for &value in &nums {
            if seen.contains(&value) {
                return value;
            }
            seen.insert(value);
        }
        -1
    }
}
