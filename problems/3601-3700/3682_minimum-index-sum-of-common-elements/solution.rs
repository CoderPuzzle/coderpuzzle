use std::collections::HashMap;

impl Solution {
    pub fn minimum_sum(nums1: Vec<i32>, nums2: Vec<i32>) -> i32 {
        // For a shared value the two indices are independent, so its best
        // good pair is its first occurrence in each array: minimizing i and
        // j separately minimizes i + j. Record every value's first index in
        // nums1, never overwriting an earlier one.
        let mut first_index: HashMap<i32, usize> = HashMap::new();
        for (index, value) in nums1.iter().enumerate() {
            first_index.entry(*value).or_insert(index);
        }
        // One pass over nums2: every value the map knows scores
        // first_index[nums2[j]] + j, and the smallest score wins. The flag
        // stays -1 when nothing matched.
        let mut best: i32 = -1;
        for (j, value) in nums2.iter().enumerate() {
            if let Some(&earlier) = first_index.get(value) {
                let total = earlier as i32 + j as i32;
                if best == -1 || total < best {
                    best = total;
                }
            }
        }
        best
    }
}
