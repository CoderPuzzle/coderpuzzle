use std::collections::HashMap;

impl Solution {
    pub fn four_sum_count(nums1: Vec<i32>, nums2: Vec<i32>, nums3: Vec<i32>, nums4: Vec<i32>) -> i32 {
        // Meet in the middle: a+b+c+d = 0 iff a+b = -(c+d), so index the
        // first two arrays' pair sums with multiplicities (not a set).
        let mut sums: HashMap<i32, i32> = HashMap::new();
        for &a in &nums1 {
            for &b in &nums2 {
                *sums.entry(a + b).or_insert(0) += 1;
            }
        }
        let mut total = 0i32;
        // Each (c,d) pair adds the number of (a,b) pairs summing to its
        // negation; every zero tuple is counted once via its unique split.
        for &c in &nums3 {
            for &d in &nums4 {
                if let Some(&count) = sums.get(&-(c + d)) {
                    total += count;
                }
            }
        }
        total
    }
}
