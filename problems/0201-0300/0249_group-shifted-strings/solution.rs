use std::collections::HashMap;

impl Solution {
    pub fn group_strings(strings: Vec<String>) -> Vec<Vec<String>> {
        // Anchored key -> position of its group in the groups vector.
        let mut index: HashMap<Vec<u8>, usize> = HashMap::new();
        let mut groups: Vec<Vec<String>> = Vec::new();
        for word in strings {
            // Anchoring on the first letter canonicalizes the shifting
            // sequence: left-shift the word until that letter becomes 'a' —
            // the same gap from it to every letter, mod 26 — so shifted
            // copies produce identical keys and unshiftable strings never
            // collide on one.
            let first = word.as_bytes()[0];
            let key: Vec<u8> = word.bytes().map(|b| b'a' + (b + 26 - first) % 26).collect();
            // Every word lands in exactly one bucket, alongside precisely its
            // shifts; a first-seen key opens a new group.
            match index.get(&key) {
                Some(&i) => groups[i].push(word),
                None => {
                    index.insert(key, groups.len());
                    groups.push(vec![word]);
                }
            }
        }
        groups
    }
}
