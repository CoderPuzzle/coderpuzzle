use std::collections::BinaryHeap;

impl Solution {
    pub fn max_sliding_window(nums: Vec<i32>, k: i32) -> Vec<i32> {
        let k = k as usize;
        // BinaryHeap is a max-heap; tuple ordering compares value first.
        let mut heap = BinaryHeap::new();
        let mut result: Vec<i32> = Vec::with_capacity(nums.len().saturating_sub(k.saturating_sub(1)));
        for i in 0..nums.len() {
            heap.push((nums[i], i));
            // Lazy deletion: pop records whose index has slid out of the window.
            while let Some(&(_, idx)) = heap.peek() {
                if idx + k <= i {
                    heap.pop();
                } else {
                    break;
                }
            }
            // The top is now the largest value still inside the window.
            if i + 1 >= k {
                result.push(heap.peek().unwrap().0);
            }
        }
        result
    }
}
