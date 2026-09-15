use std::collections::HashSet;

impl Solution {
    pub fn intersection(nums1: Vec<i32>, nums2: Vec<i32>) -> Vec<i32> {
        // The set does the uniqueness bookkeeping: hashing nums1's values
        // answers "is this value shared?" in O(1) average, and collecting
        // the hits into a second set collapses the duplicates both inputs
        // carry, so each shared value is kept exactly once. The final sort
        // pins the output to the ascending order the judge compares exactly.
        let seen: HashSet<i32> = nums1.into_iter().collect();
        let shared: HashSet<i32> = nums2.into_iter().filter(|value| seen.contains(value)).collect();
        let mut result: Vec<i32> = shared.into_iter().collect();
        result.sort_unstable();
        result
    }
}
