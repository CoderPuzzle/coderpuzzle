impl Solution {
    pub fn is_prefix_string(s: String, words: Vec<String>) -> bool {
        // Match each word in order against the front of s: a prefix string is
        // exactly the concatenation of some first-k words, so once s is fully
        // consumed by exact word matches it must be one.
        let mut i = 0;
        for word in &words {
            if i + word.len() > s.len() || !s[i..].starts_with(word.as_str()) {
                return false;
            }
            i += word.len();
            if i == s.len() {
                return true;
            }
        }
        false
    }
}
