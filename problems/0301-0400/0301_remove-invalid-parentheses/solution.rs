use std::collections::HashSet;

impl Solution {
    fn is_valid(s: &[u8]) -> bool {
        // Balance scan: fail as soon as a ')' has no '(' to match,
        // and require the counter to end back at zero.
        let mut count = 0i32;
        for &ch in s {
            if ch == b'(' {
                count += 1;
            } else if ch == b')' {
                count -= 1;
                if count < 0 {
                    return false;
                }
            }
        }
        count == 0
    }

    pub fn remove_invalid_parentheses(s: String) -> Vec<String> {
        let bytes = s.into_bytes();
        // BFS over removal counts: every string in a level has had the
        // same number of characters deleted, so the first level holding
        // any valid string is exactly the minimum-removal answer.
        let mut level: HashSet<Vec<u8>> = HashSet::new();
        level.insert(bytes);
        loop {
            let mut valid: Vec<String> = level
                .iter()
                .filter(|item| Solution::is_valid(item))
                .map(|item| String::from_utf8(item.clone()).unwrap())
                .collect();
            if !valid.is_empty() {
                // Sorted for deterministic output.
                valid.sort();
                return valid;
            }
            // Expand one more deletion; only parentheses are removed and
            // the set dedups deletions that produce the same string.
            let mut next: HashSet<Vec<u8>> = HashSet::new();
            for item in &level {
                for i in 0..item.len() {
                    let ch = item[i];
                    if ch == b'(' || ch == b')' {
                        let mut cand = item.clone();
                        cand.remove(i);
                        next.insert(cand);
                    }
                }
            }
            level = next;
        }
    }
}
