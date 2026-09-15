use std::collections::HashMap;

impl Solution {
    pub fn top_k_frequent(words: Vec<String>, k: i32) -> Vec<String> {
        // One counting pass over the array.
        let mut counts: HashMap<&str, i32> = HashMap::new();
        for w in &words {
            *counts.entry(w.as_str()).or_insert(0) += 1;
        }
        // Buckets indexed by frequency: a word with count c lands in
        // buckets[c], and no count can exceed n.
        let n = words.len();
        let mut buckets: Vec<Vec<&str>> = vec![Vec::new(); n + 1];
        for (&word, &count) in counts.iter() {
            buckets[count as usize].push(word);
        }
        let mut result: Vec<String> = Vec::with_capacity(k as usize);
        // Walk frequencies from the highest possible down; within one
        // bucket sort words ascending, so ties break alphabetically —
        // and stop as soon as k words are in hand.
        for c in (1..=n).rev() {
            if result.len() >= k as usize {
                break;
            }
            let bucket = &mut buckets[c];
            if bucket.is_empty() {
                continue;
            }
            bucket.sort_unstable();
            for &word in bucket.iter() {
                if result.len() == k as usize {
                    break;
                }
                result.push(word.to_string());
            }
        }
        result
    }
}
