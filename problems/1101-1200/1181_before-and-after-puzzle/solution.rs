use std::collections::BTreeSet;
use std::collections::HashMap;

impl Solution {
    pub fn before_and_after_puzzles(phrases: Vec<String>) -> Vec<String> {
        let words: Vec<Vec<&str>> = phrases.iter().map(|p| p.split(' ').collect()).collect();
        // File every phrase position under its first word: the bucket a
        // predecessor will search by its own last word.
        let mut by_first: HashMap<&str, Vec<usize>> = HashMap::new();
        for (i, ws) in words.iter().enumerate() {
            by_first.entry(ws[0]).or_default().push(i);
        }
        // BTreeSet keeps results sorted and deduplicated.
        let mut results: BTreeSet<String> = BTreeSet::new();
        for (i, ws) in words.iter().enumerate() {
            let last = *ws.last().unwrap();
            if let Some(bucket) = by_first.get(last) {
                for &j in bucket {
                    if j == i {
                        continue; // a phrase never pairs with its own position
                    }
                    let mut merged = phrases[i].clone();
                    for &tail in &words[j][1..] {
                        merged.push(' ');
                        merged.push_str(tail);
                    }
                    results.insert(merged);
                }
            }
        }
        results.into_iter().collect()
    }
}
