use std::cmp::Reverse;
use std::collections::BinaryHeap;

impl Solution {
    pub fn k_smallest_pairs(nums1: Vec<i32>, nums2: Vec<i32>, k: i32) -> Vec<Vec<i32>> {
        let mut result: Vec<Vec<i32>> = Vec::new();
        if nums1.is_empty() || nums2.is_empty() || k <= 0 {
            return result;
        }
        let mut heap: BinaryHeap<Reverse<(i64, usize, usize)>> = BinaryHeap::new();
        // Seed each active row's minimum (nums1[i], nums2[0]); rows past
        // min(len(nums1), k) can never reach the k smallest.
        let limit = nums1.len().min(k as usize);
        for i in 0..limit {
            heap.push(Reverse((nums1[i] as i64 + nums2[0] as i64, i, 0usize)));
        }
        while let Some(Reverse((_, i, j))) = heap.pop() {
            if result.len() >= k as usize {
                break;
            }
            // The popped pair's only unexplored successor in its row is
            // (i, j+1); pushing it keeps the heap holding the minimum of
            // every active row, so each pop yields the global minimum left.
            result.push(vec![nums1[i], nums2[j]]);
            if j + 1 < nums2.len() {
                heap.push(Reverse((nums1[i] as i64 + nums2[j + 1] as i64, i, j + 1)));
            }
        }
        result
    }
}
