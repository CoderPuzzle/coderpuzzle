impl Solution {
    pub fn minimum_time_to_initial_state(word: String, k: i32) -> i32 {
        // After t seconds exactly t*k original characters have been removed
        // from the front; additions only ever land behind the survivors.
        // The word reverts iff nothing survives (t*k >= n) or the surviving
        // suffix word[t*k:] equals the prefix it would occupy.
        let bytes = word.as_bytes();
        let n = bytes.len() as i32;
        let mut t = 1i32;
        while t * k < n && bytes[..(n - t * k) as usize] != bytes[(t * k) as usize..] {
            t += 1;
        }
        t
    }
}
