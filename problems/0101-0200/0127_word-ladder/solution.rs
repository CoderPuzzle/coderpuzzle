use std::collections::{HashMap, HashSet};

impl Solution {
    pub fn ladder_length(begin_word: String, end_word: String, word_list: Vec<String>) -> i32 {
        let words: HashSet<&str> = word_list.iter().map(String::as_str).collect();
        // No sequence can end outside the dictionary.
        if !words.contains(end_word.as_str()) {
            return 0;
        }
        let length = begin_word.len();
        let pattern_of = |word: &str, i: usize| -> String {
            let mut key = word.to_string();
            key.replace_range(i..=i, "*");
            key
        };

        // Bucket every word under each wildcard pattern ("hot" -> "*ot",
        // "h*t", "ho*"): all one-letter neighbors share one of its patterns.
        let mut buckets: HashMap<String, Vec<String>> = HashMap::new();
        for word in &word_list {
            for i in 0..length {
                buckets.entry(pattern_of(word, i)).or_default().push(word.clone());
            }
        }

        // Level-order BFS; steps starts at 1 because begin_word itself counts.
        let mut visited: HashSet<String> = HashSet::new();
        visited.insert(begin_word.clone());
        let mut queue = vec![begin_word];
        let mut steps = 1;
        while !queue.is_empty() {
            let mut next: Vec<String> = Vec::new();
            for word in &queue {
                if *word == end_word {
                    return steps;
                }
                for i in 0..length {
                    // remove() pops the bucket so it is read once overall and
                    // never re-read via a same-level word sharing the pattern.
                    if let Some(bucket) = buckets.remove(&pattern_of(word, i)) {
                        // Each word is enqueued at most once.
                        for neighbor in bucket {
                            if visited.insert(neighbor.clone()) {
                                next.push(neighbor);
                            }
                        }
                    }
                }
            }
            queue = next;
            steps += 1;
        }
        0
    }
}
