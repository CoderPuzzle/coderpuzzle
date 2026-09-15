use std::collections::HashSet;

impl Solution {
    pub fn longest_valid_substring(word: String, forbidden: Vec<String>) -> i32 {
        let banned: HashSet<&str> = forbidden.iter().map(|s| s.as_str()).collect();
        let mut max_len = 0usize;
        for s in &banned {
            if s.len() > max_len {
                max_len = s.len();
            }
        }
        let w = word.as_bytes();
        let n = w.len();
        let mut left: usize = 0;
        let mut ans: usize = 0;
        // Validity is hereditary (shrinking a valid window stays valid), so a
        // two-pointer sweep finds the longest valid substring.
        for right in 0..n {
            // start = max(right - max_len, left - 1); may be -1, so track
            // (start + 1) as a lower bound. Only suffixes ending at right can
            // be forbidden, each at most max_len (<= 10) long.
            let start_p1: i64 = if (right as i64 - max_len as i64) > (left as i64 - 1) {
                right as i64 - max_len as i64
            } else {
                left as i64 - 1
            } + 1;
            let mut j: i64 = right as i64;
            // Test suffixes shortest-first: the shortest match has the
            // latest start, so jumping left past it yields the largest
            // window that excludes every forbidden occurrence.
            while j >= start_p1 {
                let sub = std::str::from_utf8(&w[j as usize..right + 1]).unwrap();
                if banned.contains(sub) {
                    left = j as usize + 1;
                    break;
                }
                j -= 1;
            }
            if right - left + 1 > ans {
                ans = right - left + 1;
            }
        }
        ans as i32
    }
}
