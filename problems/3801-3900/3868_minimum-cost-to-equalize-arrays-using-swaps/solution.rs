use std::collections::{HashMap, HashSet};

impl Solution {
    // Within-array swaps are free, so only the frequency of each value in
    // each array matters. Both arrays must end with the same multiset:
    // value v appears (cnt1[v] + cnt2[v]) / 2 times in each, which is
    // possible only when that combined count is even. Every count is at
    // most n <= 8e4, so i32 arithmetic never overflows.
    pub fn min_cost(nums1: Vec<i32>, nums2: Vec<i32>) -> i32 {
        let mut cnt1: HashMap<i32, i32> = HashMap::new();
        let mut cnt2: HashMap<i32, i32> = HashMap::new();
        let mut values: HashSet<i32> = HashSet::new();
        for v in nums1 {
            *cnt1.entry(v).or_insert(0) += 1;
            values.insert(v);
        }
        for v in nums2 {
            *cnt2.entry(v).or_insert(0) += 1;
            values.insert(v);
        }
        let mut total_diff = 0;
        for v in values {
            let a = *cnt1.get(&v).unwrap_or(&0);
            let b = *cnt2.get(&v).unwrap_or(&0);
            if (a + b) % 2 == 1 {
                return -1;
            }
            total_diff += if a > b { a - b } else { b - a };
        }
        // Each cross swap moves one surplus element out of nums1 and one out
        // of nums2, fixing two placements at once. The surplus in nums1 is
        // half the positive differences, which is a quarter of the sum of
        // all differences because the two arrays are equally large.
        total_diff / 4
    }
}
