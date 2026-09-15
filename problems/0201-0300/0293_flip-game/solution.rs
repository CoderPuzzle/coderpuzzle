impl Solution {
    pub fn generate_possible_next_moves(currentState: String) -> Vec<String> {
        let mut states = Vec::new();
        // One left-to-right scan: every position whose two characters are
        // both '+' is exactly one legal move, and ascending i emits the
        // states in the pinned order — the earlier flipped pair first.
        // windows(2) hands out every consecutive pair, overlaps included.
        for (i, pair) in currentState.as_bytes().windows(2).enumerate() {
            if pair == b"++" {
                // Keep both ends of the string, burn only the pair.
                states.push(format!("{}--{}", &currentState[..i], &currentState[i + 2..]));
            }
        }
        // A string with no "++" anywhere leaves the vector empty — no valid move.
        states
    }
}
