use std::collections::HashMap;

impl Solution {
    pub fn find_and_replace_pattern(words: Vec<String>, pattern: String) -> Vec<String> {
        // Equal signatures are exactly bijective matchability for
        // equal-length strings, so no letter-to-letter maps are needed.
        let target = Self::signature(pattern.as_bytes());
        words
            .into_iter()
            .filter(|w| Self::signature(w.as_bytes()) == target)
            .collect()
    }

    // Index each letter by its first appearance in s: b"abb" -> [0, 1, 1].
    fn signature(s: &[u8]) -> Vec<usize> {
        let mut first: HashMap<u8, usize> = HashMap::new();
        let mut sig = Vec::with_capacity(s.len());
        for &c in s {
            let next = first.len();
            sig.push(*first.entry(c).or_insert(next));
        }
        sig
    }
}
