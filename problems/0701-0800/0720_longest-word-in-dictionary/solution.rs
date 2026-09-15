use std::collections::HashSet;

impl Solution {
    pub fn longest_word(words: Vec<String>) -> String {
        // Sorted order visits every word after the word minus its last
        // character, so one sweep can grow the buildable set incrementally.
        // The alphabet is lowercase ASCII, so byte slicing cuts characters.
        let mut sorted = words;
        sorted.sort();
        let mut best = String::new();
        let mut buildable: HashSet<&str> = HashSet::new();
        for word in &sorted {
            // Buildable by the statement's rule: the word minus its last
            // character is already buildable, and a lone letter carries the
            // empty prefix, so it needs nothing.
            let stem = &word[..word.len() - 1];
            if word.len() == 1 || buildable.contains(stem) {
                buildable.insert(word.as_str());
                // Strictly longer only: among equal lengths the first word
                // in sorted order — the lexicographically smallest — wins.
                if word.len() > best.len() {
                    best = word.clone();
                }
            }
        }
        // Nothing buildable at all: the statement's empty-string answer.
        best
    }
}
