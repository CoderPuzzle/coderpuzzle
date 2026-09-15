impl Solution {
    pub fn prefix_count(words: Vec<String>, pref: String) -> i32 {
        // Straight scan: count the words whose leading characters match
        // pref exactly.
        words.iter().filter(|w| w.starts_with(&pref)).count() as i32
    }
}
