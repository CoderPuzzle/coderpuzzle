use std::collections::{HashMap, VecDeque};

impl Solution {
    pub fn anagram_mappings(nums1: Vec<i32>, nums2: Vec<i32>) -> Vec<i32> {
        // Each element of nums1 must land on an index of nums2 that holds
        // the same value, and with repeats no index can serve two elements.
        // One pass files every value's indices in nums2 into a queue, left
        // to right; the second walk hands each element of nums1 the front
        // of its queue and pops it, so every copy takes the leftmost
        // position not claimed by an earlier copy.
        let mut positions: HashMap<i32, VecDeque<i32>> = HashMap::new();
        for (index, &value) in nums2.iter().enumerate() {
            positions
                .entry(value)
                .or_insert_with(VecDeque::new)
                .push_back(index as i32);
        }
        let mut mapping = Vec::with_capacity(nums1.len());
        for &value in &nums1 {
            let index = positions.get_mut(&value).unwrap().pop_front().unwrap();
            mapping.push(index);
        }
        mapping
    }
}
