use std::collections::HashMap;

impl Solution {
    pub fn widest_pair_of_indices(nums1: Vec<i32>, nums2: Vec<i32>) -> i32 {
        // Track the running prefix difference (sum1 - sum2); a range has
        // equal sums in both arrays iff the difference repeats. Seed the
        // empty prefix's value 0 at -1 so pairs starting at index 0 measure
        // correctly.
        let mut first: HashMap<i32, i32> = HashMap::with_capacity(nums1.len() * 2);
        first.insert(0, -1);
        let mut diff = 0i32;
        let mut best = 0i32;
        for i in 0..nums1.len() {
            diff += nums1[i] - nums2[i];
            // A repeated difference spans a valid pair; keeping only each
            // value's FIRST occurrence maximizes every later span using it.
            if let Some(&j) = first.get(&diff) {
                if i as i32 - j > best {
                    best = i as i32 - j;
                }
            } else {
                first.insert(diff, i as i32);
            }
        }
        best
    }
}
