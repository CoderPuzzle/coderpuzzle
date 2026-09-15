use std::collections::HashSet;

impl Solution {
    // A sentence is a pangram exactly when its set of distinct characters
    // is the whole lowercase alphabet, so collect the distinct characters
    // and compare the set's size with 26.
    pub fn check_if_pangram(sentence: String) -> bool {
        let mut seen: HashSet<char> = HashSet::new();
        for c in sentence.chars() {
            seen.insert(c);
            if seen.len() == 26 {
                return true;
            }
        }
        false
    }
}
