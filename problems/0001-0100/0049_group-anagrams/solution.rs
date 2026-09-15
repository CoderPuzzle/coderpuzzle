use std::collections::HashMap;

impl Solution {
    pub fn group_anagrams(strs: Vec<String>) -> Vec<Vec<String>> {
        // Sorted key -> position of its group in the groups vector.
        let mut index: HashMap<Vec<u8>, usize> = HashMap::new();
        let mut groups: Vec<Vec<String>> = Vec::new();
        for word in strs {
            // Sorting canonicalizes the character multiset: anagrams produce
            // byte-identical keys and non-anagrams can never collide on one.
            let mut key = word.as_bytes().to_vec();
            key.sort_unstable();
            // Every word lands in exactly one bucket, alongside precisely its
            // rearrangements; a first-seen key opens a new group.
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
