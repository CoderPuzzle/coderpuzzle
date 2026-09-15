use std::cmp::Reverse;
use std::collections::BinaryHeap;

impl Solution {
    pub fn find_kth_largest(nums: Vec<i32>, k: i32) -> i32 {
        // A min-heap of size k holds the k largest values seen so far;
        // its root is the smallest of them — the current kth largest.
        let mut heap: BinaryHeap<Reverse<i32>> = BinaryHeap::new();
        for i in 0..k as usize {
            heap.push(Reverse(nums[i]));
        }
        for i in k as usize..nums.len() {
            // Peek first: only values strictly greater than the root
            // earn a pop-and-push, keeping the pass O(n log k). The
            // max-heap of Reverse orders by the smallest value, so the
            // root's inner value is the current minimum.
            if nums[i] > heap.peek().unwrap().0 {
                heap.pop();
                heap.push(Reverse(nums[i]));
            }
        }
        // When the scan ends the root is the smallest of the top k —
        // the kth largest by rank, duplicates counted.
        heap.peek().unwrap().0
    }
}
