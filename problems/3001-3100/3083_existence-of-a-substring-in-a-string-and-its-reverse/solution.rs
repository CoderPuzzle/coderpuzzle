use std::collections::HashSet;

impl Solution {
    // A length-2 substring of s shows up in reverse(s) exactly when its
    // own reversal shows up somewhere in s, since reading s backwards
    // turns every adjacent pair xy into yx. One pass records each pair
    // in a set and looks the current pair up flipped — a hit on yx
    // means an earlier xy mirrors into it, and a later yx finds the xy
    // recorded before it. A doubled letter is its own reversal, so xx
    // matches the moment it appears.
    pub fn is_substring_present(s: String) -> bool {
        let mut seen = HashSet::new();
        let bytes = s.as_bytes();
        for i in 0..s.len() - 1 {
            if bytes[i] == bytes[i + 1] || seen.contains(&(bytes[i + 1], bytes[i])) {
                return true;
            }
            seen.insert((bytes[i], bytes[i + 1]));
        }
        false
    }
}
