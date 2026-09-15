use std::collections::BTreeSet;

impl Solution {
    pub fn shortest_substrings(arr: Vec<String>) -> Vec<String> {
        // Join every other string into one scan text, NUL-separated so a
        // match can never straddle a boundary; since candidates contain
        // only lowercase letters, one containment test per candidate
        // then covers "occurs in any other string". Candidates are
        // tried shortest first and, within a length, in sorted order,
        // so the first survivor is both shortest and smallest.
        let mut answer: Vec<String> = Vec::with_capacity(arr.len());
        for i in 0..arr.len() {
            let mut others = String::new();
            for (j, other) in arr.iter().enumerate() {
                if j != i {
                    others.push_str(other);
                    others.push('\0');
                }
            }
            let s = &arr[i];
            let mut best = String::new();
            for length in 1..=s.len() {
                let candidates: BTreeSet<&str> = (0..=s.len() - length).map(|a| &s[a..a + length]).collect();
                let mut found = false;
                for candidate in candidates {
                    if !others.contains(candidate) {
                        best = candidate.to_string();
                        found = true;
                        break;
                    }
                }
                if found {
                    break;
                }
            }
            answer.push(best);
        }
        answer
    }
}
