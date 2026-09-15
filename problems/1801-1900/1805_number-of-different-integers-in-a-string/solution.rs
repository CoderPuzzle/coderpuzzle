use std::collections::HashSet;

impl Solution {
    pub fn num_different_integers(word: String) -> i32 {
        // A digit run can be up to 1000 digits long, far beyond any
        // fixed-width integer, so runs are never parsed: each is stripped
        // of leading zeros and compared as a string in a hash set. The
        // strip loop keeps one digit, so an all-zero run stays "0".
        let n = word.len();
        let bytes = word.as_bytes();
        let mut seen: HashSet<&str> = HashSet::new();
        let mut i = 0;
        while i < n {
            if !bytes[i].is_ascii_digit() {
                i += 1;
                continue;
            }
            let mut j = i;
            while j < n && bytes[j].is_ascii_digit() {
                j += 1;
            }
            let mut k = i;
            while k + 1 < j && bytes[k] == b'0' {
                k += 1;
            }
            seen.insert(&word[k..j]);
            i = j;
        }
        seen.len() as i32
    }
}
