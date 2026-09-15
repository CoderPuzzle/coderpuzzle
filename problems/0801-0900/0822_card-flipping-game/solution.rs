use std::collections::HashSet;

impl Solution {
    pub fn flip_game(fronts: Vec<i32>, backs: Vec<i32>) -> i32 {
        // A card printed with the same number on both faces shows that number
        // no matter which way it is flipped, so that number can never be good.
        // Any other printed number can be good: rest one card carrying it with
        // that side down, and every other card — at most one of its two faces
        // carries the number — hides it face down. The flips are independent,
        // so nothing else has to be planned: the answer is the smallest
        // printed number that no both-faces card forces upward.
        let forced: HashSet<i32> = fronts
            .iter()
            .zip(&backs)
            .filter(|(front, back)| front == back)
            .map(|(front, _)| *front)
            .collect();
        let mut best = 0;
        for &value in fronts.iter().chain(backs.iter()) {
            if !forced.contains(&value) && (best == 0 || value < best) {
                best = value;
            }
        }
        best
    }
}
