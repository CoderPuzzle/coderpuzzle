impl Solution {
    pub fn is_acronym(words: Vec<String>, s: String) -> bool {
        // Collect the first character of every word, assemble them into one
        // string in order, and compare the assembled acronym with s. Rust's
        // string equality reports false for a length difference exactly as
        // it does for any mismatched byte.
        let mut letters = String::with_capacity(words.len());
        for word in &words {
            letters.push(word.chars().next().unwrap());
        }
        letters == s
    }
}
