impl Solution {
    pub fn min_operations(s: String) -> i32 {
        // Exactly two alternating targets exist; each position matches
        // one of them, so one mismatch count against the 0101... target
        // determines both costs.
        let n = s.len();
        let mismatch = s
            .bytes()
            .enumerate()
            .filter(|&(i, b)| (b - b'0') as usize != i % 2)
            .count();
        mismatch.min(n - mismatch) as i32
    }
}
