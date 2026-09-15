use std::cmp::Ordering;
use std::collections::BinaryHeap;

// wrapper: BinaryHeap (a max-heap) needs Ord, which bare f64 lacks
#[derive(Clone, Copy, PartialEq)]
struct OrdF64(f64);

impl Eq for OrdF64 {}

impl PartialOrd for OrdF64 {
    fn partial_cmp(&self, other: &Self) -> Option<Ordering> {
        Some(self.cmp(other))
    }
}

impl Ord for OrdF64 {
    fn cmp(&self, other: &Self) -> Ordering {
        self.0.partial_cmp(&other.0).unwrap()
    }
}

impl Solution {
    pub fn halve_array(nums: Vec<i32>) -> i32 {
        let mut total = 0.0f64;
        let mut heap: BinaryHeap<OrdF64> = BinaryHeap::new();
        for &x in &nums {
            total += x as f64;
            heap.push(OrdF64(x as f64));
        }
        // track the remaining reduction needed instead of re-summing each step
        let mut target = total / 2.0;
        let mut ops = 0;
        while target > 0.0 {
            // greedy: halving the current maximum removes the most sum per op
            let largest = heap.pop().unwrap().0;
            let half = largest / 2.0;
            target -= half;
            // the half may still be the max and get halved again
            heap.push(OrdF64(half));
            ops += 1;
        }
        ops
    }
}
