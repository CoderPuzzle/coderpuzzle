use std::collections::HashMap;

impl Solution {
    pub fn top_k_frequent(words: Vec<String>, k: i32) -> Vec<String> {
        // One counting pass over the array.
        let mut counts: HashMap<&str, i32> = HashMap::new();
        for w in &words {
            *counts.entry(w.as_str()).or_insert(0) += 1;
        }
        let mut ranked: Vec<(i32, &str)> = counts.into_iter().map(|(word, count)| (count, word)).collect();
        // Sort every unique word under the statement's total order — count
        // descending, then word ascending — and keep the first k.
        ranked.sort_by(|a, b| b.0.cmp(&a.0).then_with(|| a.1.cmp(&b.1)));
        ranked
            .into_iter()
            .take(k as usize)
            .map(|(_, word)| word.to_string())
            .collect()
    }
}
