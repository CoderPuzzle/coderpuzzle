impl Solution {
    pub fn num_moves_stones(a: i32, b: i32, c: i32) -> Vec<i32> {
        // Sort into x <= y <= z so the two gaps (empty slots between
        // neighbors) are easy to read off.
        let mut sorted = [a, b, c];
        sorted.sort();
        let (x, y, z) = (sorted[0], sorted[1], sorted[2]);
        if y - x == 1 && z - y == 1 {
            // No empty slots at all: already consecutive.
            return vec![0, 0];
        }
        // One move suffices whenever a gap is 0 or 1 stone-width wide,
        // since the far stone can jump straight into what remains.
        let min_moves = if y - x <= 2 || z - y <= 2 { 1 } else { 2 };
        // Every move shrinks the spread z - x by exactly 1 in the best
        // case, and the spread must end at 2 (three consecutive values),
        // so the maximum is the total number of empty slots.
        let max_moves = z - x - 2;
        vec![min_moves, max_moves]
    }
}
