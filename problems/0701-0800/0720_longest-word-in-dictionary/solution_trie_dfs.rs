use std::collections::HashMap;

struct TrieNode {
    children: HashMap<u8, TrieNode>,
    end: bool,
}

impl Solution {
    pub fn longest_word(words: Vec<String>) -> String {
        // The trie stores every word once; a node's `end` marks where a word
        // stops. Walking only through `end` nodes keeps every spelled prefix
        // a word, so each path the walk takes is a buildable word. The
        // alphabet is lowercase ASCII, so raw bytes key the children.
        let mut root = TrieNode {
            children: HashMap::new(),
            end: false,
        };
        for word in &words {
            let mut node = &mut root;
            for byte in word.bytes() {
                node = node.children.entry(byte).or_insert(TrieNode {
                    children: HashMap::new(),
                    end: false,
                });
            }
            node.end = true;
        }
        let mut best = String::new();
        walk(&root, &mut String::new(), &mut best);
        // Nothing buildable at all: the statement's empty-string answer.
        best
    }
}

fn walk(node: &TrieNode, path: &mut String, best: &mut String) {
    // Strictly longer wins; among equal lengths the smaller word
    // wins — compared explicitly, never via child order.
    if path.len() > best.len() || (path.len() == best.len() && path.as_str() < best.as_str()) {
        *best = path.clone();
    }
    for (byte, child) in &node.children {
        if child.end {
            path.push(*byte as char);
            walk(child, path, best);
            path.pop();
        }
    }
}
