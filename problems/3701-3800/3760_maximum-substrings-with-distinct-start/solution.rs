impl Solution {
    pub fn max_distinct_starts(s: String) -> i32 {
        // A piece is decided by its start: scanning left to right, the
        // current letter may open a new piece exactly when no earlier piece
        // already started with it. Accepting it costs only that one letter's
        // availability, and each letter starts at most one piece anyway, so
        // the greedy never blocks a better split.
        let mut seen = [false; 26];
        for &b in s.as_bytes() {
            seen[(b - b'a') as usize] = true;
        }
        seen.iter().filter(|&&used| used).count() as i32
    }
}
