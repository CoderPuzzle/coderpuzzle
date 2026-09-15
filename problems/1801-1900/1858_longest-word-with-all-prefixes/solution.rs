use std::collections::HashSet;

impl Solution {
    // A word qualifies iff every prefix chain is present. Sorting the unique
    // words once makes the first qualifying word of each new record length
    // the answer candidate, and lexicographic order breaks ties for free.
    pub fn longest_word(words: Vec<String>) -> String {
        let set: HashSet<&str> = words.iter().map(|s| s.as_str()).collect();
        let mut sorted: Vec<&&str> = set.iter().collect();
        sorted.sort();
        let mut best = "";
        for &w in sorted {
            if w.len() <= best.len() {
                continue;
            }
            if (1..w.len()).all(|i| set.contains(&w[..i])) {
                best = w;
            }
        }
        best.to_string()
    }
}
