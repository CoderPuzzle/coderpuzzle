use std::cmp::Reverse;
use std::collections::{BinaryHeap, HashMap};

impl Solution {
    pub fn top_k_frequent(words: Vec<String>, k: i32) -> Vec<String> {
        // One counting pass over the array.
        let mut counts: HashMap<&str, i32> = HashMap::new();
        for w in &words {
            *counts.entry(w.as_str()).or_insert(0) += 1;
        }
        // Size-k heap of (count, Reverse(word)) where the root is the
        // weakest keeper: smallest count, and among equal counts the
        // largest word — eviction order mirrors the final ranking.
        let mut heap: BinaryHeap<Reverse<(i32, Reverse<&str>)>> = BinaryHeap::new();
        for (&word, &count) in counts.iter() {
            let item = (count, Reverse(word));
            if heap.len() < k as usize {
                heap.push(Reverse(item));
                continue;
            }
            let root = heap.peek().unwrap().0;
            // Replace the root only when the newcomer outranks it:
            // higher count, or equal count and smaller word.
            if item > root {
                heap.pop();
                heap.push(Reverse(item));
            }
        }
        let mut survivors: Vec<(i32, &str)> = heap
            .into_iter()
            .map(|Reverse((count, Reverse(word)))| (count, word))
            .collect();
        // Survivors are exactly the top k by (higher count, then smaller
        // word); emit them in that order.
        survivors.sort_by(|a, b| b.0.cmp(&a.0).then_with(|| a.1.cmp(&b.1)));
        survivors
            .into_iter()
            .take(k as usize)
            .map(|(_, word)| word.to_string())
            .collect()
    }
}
