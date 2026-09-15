impl Solution {
    // The trailing digit is the 1-indexed slot; drop each word into its
    // slot and rejoin.
    pub fn sort_sentence(s: String) -> String {
        let words: Vec<&str> = s.split(' ').collect();
        let mut out = vec![""; words.len()];
        for w in &words {
            let bytes = w.as_bytes();
            let slot = (bytes[bytes.len() - 1] - b'1') as usize;
            out[slot] = &w[..w.len() - 1];
        }
        out.join(" ")
    }
}
