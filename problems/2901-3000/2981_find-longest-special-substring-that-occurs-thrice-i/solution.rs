use std::collections::HashMap;

impl Solution {
    pub fn maximum_length(s: String) -> i32 {
        // The size bound invites brute force: tally every special
        // substring in a hash map, then keep the longest that reached
        // three occurrences.
        let mut counts: HashMap<&str, i32> = HashMap::new();
        let n = s.len();
        for i in 0..n {
            for j in i..n {
                if s.as_bytes()[j] != s.as_bytes()[i] {
                    break;
                }
                *counts.entry(&s[i..j + 1]).or_insert(0) += 1;
            }
        }
        let mut best = -1;
        for (sub, &c) in &counts {
            if c >= 3 && sub.len() as i32 > best {
                best = sub.len() as i32;
            }
        }
        best
    }
}
