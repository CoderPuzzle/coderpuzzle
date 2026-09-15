use std::collections::HashSet;

impl Solution {
    pub fn longest_consecutive(nums: Vec<i32>) -> i32 {
        // A hash set answers "is this value present?" in O(1); iterating the
        // set itself also collapses duplicates before any walking starts.
        let values: HashSet<i32> = nums.into_iter().collect();
        let mut longest = 0;
        for &value in &values {
            // value - 1 absent means value is where its maximal run begins.
            // Skipping every non-initial member is what keeps the walk linear:
            // without the check, each run would be re-traversed by all of its
            // members and the nested loops would go quadratic.
            if !values.contains(&(value - 1)) {
                let mut length = 0;
                while values.contains(&(value + length)) {
                    length += 1;
                }
                longest = longest.max(length);
            }
        }
        longest
    }
}
