use std::cmp::Reverse;
use std::collections::BinaryHeap;

impl Solution {
    pub fn min_operations(nums: Vec<i32>, k: i32) -> i32 {
        let mut heap: BinaryHeap<Reverse<i64>> = nums.iter().map(|&x| Reverse(x as i64)).collect();
        let k = k as i64;
        let mut operations: i32 = 0;
        // Each operation must consume the two smallest values, so the process
        // is fully deterministic once the array sits in a min-heap.
        // Done when the minimum reaches k (then every element has) or fewer
        // than two elements remain.
        while heap.len() >= 2 && heap.peek().map_or(false, |&Reverse(v)| v < k) {
            let Reverse(x) = heap.pop().unwrap();
            let Reverse(y) = heap.pop().unwrap();
            // x is the smaller pop by heap order, so this is min*2 + max.
            heap.push(Reverse(x * 2 + y));
            operations += 1;
        }
        operations
    }
}
