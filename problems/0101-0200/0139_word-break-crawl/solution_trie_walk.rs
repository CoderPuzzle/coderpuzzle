use std::collections::HashMap;

impl Solution {
    pub fn word_break(s: String, wordDict: Vec<String>) -> bool {
        // Trie over the wordDict: nodes own a child map keyed by letter
        // plus the flag marking a node where a word ends. From every
        // reachable position a walk follows s's own characters, so a branch
        // dies at the first character no remaining word shares, and each
        // terminal crossed marks the prefix after it reachable.
        #[derive(Default)]
        struct TrieNode {
            children: HashMap<u8, TrieNode>,
            end: bool,
        }
        let mut root = TrieNode::default();
        for word in &wordDict {
            let mut node = &mut root;
            for ch in word.as_bytes() {
                node = node.children.entry(*ch).or_default();
            }
            node.end = true;
        }
        let n = s.len();
        let bytes = s.as_bytes();
        let mut reachable = vec![false; n + 1];
        reachable[0] = true;
        for i in 0..n {
            if !reachable[i] {
                continue;
            }
            let mut node = &root;
            for j in i..n {
                match node.children.get(&bytes[j]) {
                    None => break,
                    Some(child) => {
                        node = child;
                        // Every terminal on the path ends a word at this depth.
                        if node.end {
                            reachable[j + 1] = true;
                        }
                    }
                }
            }
        }
        reachable[n]
    }
}
