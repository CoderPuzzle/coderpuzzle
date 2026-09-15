use std::collections::HashMap;

impl Solution {
    pub fn uncommon_from_sentences(s1: String, s2: String) -> Vec<String> {
        // The pinned order is s1's words then s2's, and joining the
        // sentences with one space makes a single stream in that order.
        let combined = format!("{} {}", s1, s2);
        let words: Vec<&str> = combined.split(' ').collect();
        let mut counts: HashMap<&str, i32> = HashMap::new();
        for &word in &words {
            *counts.entry(word).or_insert(0) += 1;
        }
        // An uncommon word occurs exactly once overall, so emitting it at
        // its only occurrence is first-appearance order within each
        // sentence — no sort, no seen-list, no hash iteration order.
        let mut result = Vec::with_capacity(words.len());
        for word in words {
            if counts[word] == 1 {
                result.push(word.to_string());
            }
        }
        result
    }
}
