use std::collections::HashSet;

impl Solution {
    pub fn distinct_names(ideas: Vec<String>) -> i64 {
        // Suffixes (name minus first letter) grouped by first letter; within
        // a group every suffix is unique because all names are unique.
        let mut suffixes: Vec<HashSet<String>> = vec![HashSet::new(); 26];
        for idea in &ideas {
            let first = (idea.as_bytes()[0] - b'a') as usize;
            suffixes[first].insert(idea[1..].to_string());
        }
        // A swap between letters a and b survives exactly when neither suffix
        // already exists in the other letter's group; inclusion-exclusion
        // turns that count into sizes minus the shared overlap. The answer
        // can reach ~n^2 = 2.5 * 10^9, past i32, so the accumulator is i64.
        let mut total: i64 = 0;
        for a in 0..26 {
            for b in (a + 1)..26 {
                let mut shared: i64 = 0;
                for suffix in &suffixes[a] {
                    if suffixes[b].contains(suffix) {
                        shared += 1;
                    }
                }
                let size_a = suffixes[a].len() as i64;
                let size_b = suffixes[b].len() as i64;
                total += 2 * (size_a - shared) * (size_b - shared);
            }
        }
        total
    }
}
