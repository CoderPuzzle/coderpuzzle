use std::collections::HashSet;

impl Solution {
    pub fn relocate_marbles(nums: Vec<i32>, move_from: Vec<i32>, move_to: Vec<i32>) -> Vec<i32> {
        // Only occupancy matters: a move relocates every marble sitting on a
        // position at once, so one set of occupied positions tracks the state.
        let mut occupied: HashSet<i32> = nums.into_iter().collect();
        // In order: vacate the source, occupy the target. A self-move removes
        // and re-inserts the same position; merging into an occupied target
        // is just a set insert.
        for (source, target) in move_from.into_iter().zip(move_to) {
            occupied.remove(&source);
            occupied.insert(target);
        }
        let mut answer: Vec<i32> = occupied.into_iter().collect();
        answer.sort_unstable();
        answer
    }
}
