use std::cmp::Reverse;
use std::collections::BinaryHeap;

impl Solution {
    pub fn min_build_time(blocks: Vec<i32>, split: i32) -> i32 {
        let mut heap: BinaryHeap<Reverse<i32>> = blocks.iter().map(|&b| Reverse(b)).collect();
        while heap.len() > 1 {
            // Mount the two cheapest subtrees under one new split; heavier
            // work stays shallower, where the fan-out runs in parallel.
            let Reverse(first) = heap.pop().unwrap();
            let Reverse(second) = heap.pop().unwrap();
            heap.push(Reverse(first.max(second) + split));
        }
        heap.pop().map_or(0, |Reverse(top)| top)
    }
}
