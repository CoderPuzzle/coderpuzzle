use std::collections::{HashMap, HashSet};

impl Solution {
    pub fn sort_features(features: Vec<String>, responses: Vec<String>) -> Vec<String> {
        // A response contributes to a feature at most once: count each
        // distinct word of the response that names a feature.
        let mut popularity: HashMap<&str, i32> = HashMap::new();
        for f in &features {
            popularity.insert(f.as_str(), 0);
        }
        for response in &responses {
            let mut seen: HashSet<&str> = HashSet::new();
            for word in response.split(' ') {
                if seen.insert(word) {
                    if let Some(count) = popularity.get_mut(word) {
                        *count += 1;
                    }
                }
            }
        }
        // Total order: higher popularity first, then the earlier original
        // index — the comparator fully orders every pair, so no sort
        // stability is relied on.
        let mut order: Vec<usize> = (0..features.len()).collect();
        order.sort_by(|&a, &b| {
            let pa = popularity[features[a].as_str()];
            let pb = popularity[features[b].as_str()];
            pb.cmp(&pa).then(a.cmp(&b))
        });
        order.into_iter().map(|i| features[i].clone()).collect()
    }
}
