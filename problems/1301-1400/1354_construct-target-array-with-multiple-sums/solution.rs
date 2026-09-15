use std::collections::BinaryHeap;

impl Solution {
    pub fn is_possible(target: Vec<i32>) -> bool {
        let n = target.len();
        // With no "rest" to un-mix against, the only reachable target is [1].
        if n == 1 {
            return target[0] == 1;
        }
        // Reverse simulation: the total strictly grows each operation, so the
        // largest element of any reachable state was necessarily written last.
        // Max-heap + `total` tracking the current array sum.
        let mut total: i64 = target.iter().map(|&v| v as i64).sum();
        let mut heap: BinaryHeap<i64> = target.iter().map(|&v| v as i64).collect();
        loop {
            let largest = heap.pop().unwrap();
            // Max is 1 => every other element (never larger) is also 1.
            if largest == 1 {
                return true;
            }
            let rest = total - largest;
            // The last write must have exceeded the rest of the array; it
            // also catches rest == 0 before the division.
            if largest <= rest {
                return false;
            }
            // Batch-jump consecutive un-mixings of the same element in one
            // go: `steps` reversals leave largest mod rest biased to [1, rest],
            // avoiding one-rest-at-a-time subtraction on 1e9-scale gaps.
            let steps = (largest - 1) / rest;
            let prev = largest - steps * rest;
            heap.push(prev);
            total = rest + prev;
        }
    }
}
