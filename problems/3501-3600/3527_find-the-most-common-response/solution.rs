use std::collections::{HashMap, HashSet};

impl Solution {
    pub fn find_common_response(responses: Vec<Vec<String>>) -> String {
        // Deduplicate within each day first — a response repeated in the
        // same day still counts once — then tally the deduped words across
        // days in a hash map and keep the best (count, lexicographic order)
        // seen.
        let mut counts: HashMap<String, i32> = HashMap::new();
        for day in &responses {
            let unique: HashSet<&String> = day.iter().collect();
            for word in unique {
                *counts.entry(word.clone()).or_insert(0) += 1;
            }
        }
        let mut best_word = String::new();
        let mut best_count = 0;
        for (word, count) in &counts {
            if *count > best_count || (*count == best_count && word.as_str() < best_word.as_str()) {
                best_word = word.clone();
                best_count = *count;
            }
        }
        best_word
    }
}
