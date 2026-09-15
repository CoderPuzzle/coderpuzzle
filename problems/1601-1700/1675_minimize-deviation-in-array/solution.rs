use std::collections::BinaryHeap;

impl Solution {
    pub fn minimum_deviation(nums: Vec<i32>) -> i32 {
        // Normalize: odd values are doubled once — their only upward move —
        // so afterwards every element can only shrink by halving, and every
        // reachable configuration is still visited.
        let mut heap: BinaryHeap<i32> = nums.into_iter().map(|v| if v % 2 == 1 { v * 2 } else { v }).collect();
        // The heap yields the maximum; the minimum is tracked separately.
        let mut current_min = *heap.iter().min().unwrap();
        // Snapshot the untouched configuration before any halving.
        let mut best = *heap.peek().unwrap() - current_min;
        // An even maximum can still be halved; once the maximum is odd
        // nothing can grow, so the deviation can never improve again.
        while *heap.peek().unwrap() % 2 == 0 {
            let half = heap.pop().unwrap() / 2;
            heap.push(half);
            if half < current_min {
                current_min = half;
            }
            // Re-check max − min after each halving.
            let deviation = *heap.peek().unwrap() - current_min;
            if deviation < best {
                best = deviation;
            }
        }
        best
    }
}
