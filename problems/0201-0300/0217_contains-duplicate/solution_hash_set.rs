use std::collections::HashSet;

impl Solution {
    pub fn contains_duplicate(nums: Vec<i32>) -> bool {
        // One pass with a set of already-visited values.
        let mut seen: HashSet<i32> = HashSet::new();
        for value in nums {
            // insert() returns false when the value was already present,
            // i.e. this is its second occurrence.
            if !seen.insert(value) {
                return true;
            }
        }
        // Loop finished: every element was distinct at insertion time.
        false
    }
}
