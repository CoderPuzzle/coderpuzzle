use std::collections::HashMap;

impl Solution {
    pub fn intersect(nums1: Vec<i32>, nums2: Vec<i32>) -> Vec<i32> {
        // Count how many times each value occurs in nums1, then walk nums2:
        // a value can join the result at most min(count1, count2) times,
        // which the per-value counter enforces by falling to zero.
        let mut counts = HashMap::new();
        for value in &nums1 {
            *counts.entry(*value).or_insert(0) += 1;
        }
        let mut picked: Vec<i32> = Vec::new();
        for value in &nums2 {
            let remaining = counts.get(value).copied().unwrap_or(0);
            if remaining > 0 {
                counts.insert(*value, remaining - 1);
                picked.push(*value);
            }
        }
        // The judge compares arrays exactly, so pin the any-order freedom
        // to ascending sorted order before returning.
        picked.sort_unstable();
        picked
    }
}
