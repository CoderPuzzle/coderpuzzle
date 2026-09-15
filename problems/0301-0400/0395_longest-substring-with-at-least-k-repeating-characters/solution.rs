use std::collections::HashMap;

impl Solution {
    pub fn longest_substring(s: String, k: i32) -> i32 {
        let bytes = s.as_bytes();
        Self::longest(bytes, 0, bytes.len(), k)
    }

    fn longest(s: &[u8], lo: usize, hi: usize, k: i32) -> i32 {
        if lo >= hi {
            return 0;
        }
        let mut counts: HashMap<u8, i32> = HashMap::new();
        for &ch in &s[lo..hi] {
            *counts.entry(ch).or_insert(0) += 1;
        }
        // A character rarer than k inside this piece can never reach k by
        // shortening the substring, so it is a hard splitter.
        let is_rare = |ch: u8| -> bool { counts.get(&ch).copied().unwrap_or(0) < k };
        let mut best = 0;
        let mut start = lo;
        let mut all_frequent = true;
        // Recurse on the pieces between consecutive rare characters; each
        // level eliminates at least one letter, so depth is bounded by 26.
        for i in lo..hi {
            if is_rare(s[i]) {
                all_frequent = false;
                best = best.max(Self::longest(s, start, i, k));
                start = i + 1;
            }
        }
        if all_frequent {
            // No splitter: the whole piece is already valid.
            return (hi - lo) as i32;
        }
        best.max(Self::longest(s, start, hi, k))
    }
}
