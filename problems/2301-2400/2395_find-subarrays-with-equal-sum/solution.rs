use std::collections::HashSet;

impl Solution {
    // Sweep the n-1 length-2 window sums into a set; the first repeat
    // answers true.
    pub fn find_subarrays(nums: Vec<i32>) -> bool {
        let mut seen: HashSet<i32> = HashSet::new();
        for w in nums.windows(2) {
            if !seen.insert(w[0].wrapping_add(w[1])) {
                return true;
            }
        }
        false
    }
}
