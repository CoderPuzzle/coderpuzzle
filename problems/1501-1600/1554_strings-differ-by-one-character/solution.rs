use std::collections::HashSet;

impl Solution {
    pub fn differ_by_one(words: Vec<String>) -> bool {
        let n = words.len();
        if n < 2 {
            return false;
        }
        let bytes: Vec<&[u8]> = words.iter().map(|w| w.as_bytes()).collect();
        let length = bytes[0].len();
        // Fix one position at a time; within that position, hash every word
        // with that single character masked out.
        for pos in 0..length {
            let mut seen: HashSet<Vec<u8>> = HashSet::new();
            for word in &bytes {
                let mut masked = word.to_vec();
                masked[pos] = b'*';
                // insert() returns false on a repeat: two words agree
                // everywhere except pos, and uniqueness means they differ
                // there and nowhere else.
                if !seen.insert(masked) {
                    return true;
                }
            }
        }
        false
    }
}
