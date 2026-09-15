impl Solution {
    pub fn get_encrypted_string(s: String, k: i32) -> String {
        // The encrypted string is the input rotated left by k positions:
        // position i of the answer reads chars[(i + k) % n], the character
        // k places forward with wraparound. The modulo folds completed laps
        // back into range, so k larger than n needs no special case — one
        // linear pass copies every character from its source index.
        let n = s.len();
        let chars: Vec<char> = s.chars().collect();
        (0..n).map(|i| chars[(i + k as usize) % n]).collect()
    }
}
