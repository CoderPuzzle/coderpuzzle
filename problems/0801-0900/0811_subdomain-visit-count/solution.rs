use std::collections::HashMap;

impl Solution {
    pub fn subdomain_visits(cpdomains: Vec<String>) -> Vec<String> {
        // One pass: each entry fans its count out over every dot-suffix of
        // its domain — the domain itself and each subdomain cut at a dot.
        let mut counts: HashMap<&str, i32> = HashMap::new();
        for cpdomain in &cpdomains {
            let (rep, domain) = cpdomain.split_once(' ').unwrap();
            let rep: i32 = rep.parse().unwrap();
            let mut from = 0;
            loop {
                *counts.entry(&domain[from..]).or_insert(0) += rep;
                match domain[from..].find('.') {
                    Some(dot) => from += dot + 1,
                    None => break,
                }
            }
        }
        // Pinned output order: ascending lexicographic by domain name —
        // an explicit comparator, never map iteration order.
        let mut items: Vec<(&str, i32)> = counts.into_iter().collect();
        items.sort_by(|a, b| a.0.cmp(b.0));
        items
            .into_iter()
            .map(|(name, total)| format!("{} {}", total, name))
            .collect()
    }
}
