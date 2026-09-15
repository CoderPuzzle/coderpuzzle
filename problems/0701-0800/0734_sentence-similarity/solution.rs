use std::collections::HashSet;

impl Solution {
    pub fn are_sentences_similar(
        sentence1: Vec<String>,
        sentence2: Vec<String>,
        similarPairs: Vec<Vec<String>>,
    ) -> bool {
        // Different lengths can never be similar.
        if sentence1.len() != sentence2.len() {
            return false;
        }

        // Both orientations enter the set: the relation is symmetric, so one
        // ordered lookup answers "was this pair declared?". Tuples hash
        // natively here, so no joined-string key is needed.
        let mut declared: HashSet<(&str, &str)> = HashSet::new();
        for pair in &similarPairs {
            declared.insert((pair[0].as_str(), pair[1].as_str()));
            declared.insert((pair[1].as_str(), pair[0].as_str()));
        }

        for i in 0..sentence1.len() {
            let a = sentence1[i].as_str();
            let b = sentence2[i].as_str();
            // A word is always similar to itself; anything else must be a
            // declared pair. Nothing chains: big~large and large~huge never
            // make big~huge.
            if a != b && !declared.contains(&(a, b)) {
                return false;
            }
        }
        true
    }
}
