// Set membership answers "present in the other array" in O(1); the surviving
// distinct values are emitted ascending for judging.
use std::collections::HashSet;

impl Solution {
    pub fn find_difference(nums1: Vec<i32>, nums2: Vec<i32>) -> Vec<Vec<i32>> {
        let set1: HashSet<i32> = nums1.iter().copied().collect();
        let set2: HashSet<i32> = nums2.iter().copied().collect();
        vec![
            Self::distinct_sorted(&nums1, &set2),
            Self::distinct_sorted(&nums2, &set1),
        ]
    }

    fn distinct_sorted(source: &[i32], other: &HashSet<i32>) -> Vec<i32> {
        let mut kept: Vec<i32> = source.iter().copied().filter(|value| !other.contains(value)).collect();
        kept.sort_unstable();
        kept.dedup();
        kept
    }
}
