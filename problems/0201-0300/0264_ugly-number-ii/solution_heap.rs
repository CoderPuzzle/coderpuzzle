use std::cmp::Reverse;
use std::collections::{BinaryHeap, HashSet};

impl Solution {
    pub fn nth_ugly_number(n: i32) -> i32 {
        // Frontier of the generation process: a min-heap (Reverse turns
        // BinaryHeap's max-heap ordering around) seeded with 1, so the
        // smallest not-yet-emitted ugly number is always at its top.
        // 64-bit elements: pushed multiples can overshoot the 32-bit answer.
        let mut heap: BinaryHeap<Reverse<i64>> = BinaryHeap::new();
        heap.push(Reverse(1));
        // The heap is a frontier, not a set: pushing every successor would
        // enqueue duplicates (6 = 2·3 = 3·2), so seen gates each push.
        let mut seen: HashSet<i64> = HashSet::new();
        seen.insert(1);
        for _ in 1..n {
            let Reverse(value) = heap.pop().unwrap();
            for factor in [2i64, 3, 5] {
                let multiple = value * factor;
                if seen.insert(multiple) {
                    heap.push(Reverse(multiple));
                }
            }
        }
        // After n-1 pops the heap top is the n-th ugly number in order.
        heap.peek().unwrap().0 as i32
    }
}
