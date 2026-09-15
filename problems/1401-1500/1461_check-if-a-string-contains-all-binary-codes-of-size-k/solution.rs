use std::collections::HashSet;

impl Solution {
    pub fn has_all_codes(s: String, k: i32) -> bool {
        let k = k as usize;
        // all 2^k codes present <=> distinct length-k substrings reach 2^k;
        // a string shorter than k cannot host even one code of length k
        let need = 1usize << k;
        let bytes = s.as_bytes();
        if bytes.len() < k {
            return false;
        }
        let mut seen: HashSet<&[u8]> = HashSet::new();
        for i in 0..=(bytes.len() - k) {
            seen.insert(&bytes[i..i + k]);
            // early exit: codes exhausted before the string ends
            if seen.len() == need {
                return true;
            }
        }
        seen.len() == need
    }
}
