use std::collections::HashSet;

impl Solution {
    pub fn maximum_set_size(nums1: Vec<i32>, nums2: Vec<i32>) -> i32 {
        let s1: HashSet<i32> = nums1.iter().copied().collect();
        let s2: HashSet<i32> = nums2.iter().copied().collect();

        // Count values unique to each side and the shared remainder.
        let only1 = s1.iter().filter(|v| !s2.contains(v)).count() as i32;
        let only2 = s2.iter().filter(|v| !s1.contains(v)).count() as i32;
        let common = s1.len() as i32 - only1;

        // Each side spends its slots on unique values first; leftover slots
        // add at most one new element each, and only common values qualify,
        // each counting once no matter which side inserts it.
        let half = (nums1.len() / 2) as i32;
        let a = half.min(only1);
        let b = half.min(only2);
        a + b + common.min((nums1.len() as i32) - a - b)
    }
}
