use std::collections::BinaryHeap;

impl Solution {
    pub fn last_stone_weight(stones: Vec<i32>) -> i32 {
        // The game is deterministic: only fast access to the current maximum
        // is needed, which a max-heap provides.
        let mut heap: BinaryHeap<i32> = stones.into_iter().collect();
        while heap.len() > 1 {
            // The two heaviest stones; equal ones annihilate (nothing pushed).
            let y = heap.pop().unwrap();
            let x = heap.pop().unwrap();
            if x != y {
                heap.push(y - x);
            }
        }
        // Empty heap means every stone paired off into equal smashings.
        heap.pop().unwrap_or(0)
    }
}
