use std::collections::{HashMap, HashSet};

/// Blank out the vowels of an already-lowercase word.
fn devowel(low: &str) -> String {
    low.chars()
        .map(|c| match c {
            'a' | 'e' | 'i' | 'o' | 'u' => '*',
            _ => c,
        })
        .collect()
}

impl Solution {
    pub fn spellchecker(wordlist: Vec<String>, queries: Vec<String>) -> Vec<String> {
        // One pass over the wordlist builds all three lookups; or_insert
        // keeps the FIRST word claiming each key — first-match-wins.
        let mut exact: HashSet<&str> = HashSet::new();
        let mut by_lower: HashMap<String, &str> = HashMap::new();
        let mut by_devowel: HashMap<String, &str> = HashMap::new();
        for w in &wordlist {
            exact.insert(w.as_str());
            let low = w.to_lowercase();
            by_lower.entry(low.clone()).or_insert(w.as_str());
            by_devowel.entry(devowel(&low)).or_insert(w.as_str());
        }
        // Each query walks the tiers in precedence order: exact echo, then
        // case-insensitive, then vowel-blind, then "".
        queries
            .iter()
            .map(|q| {
                if exact.contains(q.as_str()) {
                    return q.clone();
                }
                let low = q.to_lowercase();
                if let Some(&w) = by_lower.get(&low) {
                    return w.to_string();
                }
                match by_devowel.get(&devowel(&low)) {
                    Some(&w) => w.to_string(),
                    None => String::new(),
                }
            })
            .collect()
    }
}
