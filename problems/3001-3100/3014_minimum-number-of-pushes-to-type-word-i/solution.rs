impl Solution {
    pub fn minimum_pushes(word: String) -> i32 {
        // Distinct letters make frequency irrelevant: dealing them
        // round-robin over the 8 keys costs the p-th letter p / 8 + 1.
        (0..word.len() as i32).map(|position| position / 8 + 1).sum()
    }
}
