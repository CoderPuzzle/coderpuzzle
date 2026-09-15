impl Solution {
    pub fn map_word_weights(words: Vec<String>, weights: Vec<i32>) -> String {
        // Each word's weight is the sum of its characters' entries in
        // weights — at most 10 chars * 100 = 1000, comfortably inside an
        // i32. Reflecting that total's residue mod 26 down from 'z' gives
        // one letter per word (0 -> 'z', 1 -> 'y', ..., 25 -> 'a').
        let mut result = String::with_capacity(words.len());
        for word in &words {
            let mut total: i32 = 0;
            for &b in word.as_bytes() {
                total += weights[(b - b'a') as usize];
            }
            result.push((b'z' - (total % 26) as u8) as char);
        }
        result
    }
}
