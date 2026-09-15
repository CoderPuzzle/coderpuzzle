use std::collections::HashMap;

// A trie whose nodes each count the inserted instances ending at the
// node (word_count) and passing through it (prefix_count). insert walks
// the word creating children on demand, bumping prefix_count along the
// path and word_count at the terminal; the two count queries walk their
// string as far as nodes exist and read the matching counter, answering
// 0 when the walk falls off the trie. erase — guaranteed by the
// constraints to name a present word — confirms a live instance with a
// first walk, then decrements the same counters on a second; nodes left
// at zero stay in place, since no live instance crosses them anymore.
pub struct Trie {
    root: TrieNode,
}

#[derive(Default)]
struct TrieNode {
    children: HashMap<u8, TrieNode>,
    word_count: i32,
    prefix_count: i32,
}

impl Trie {
    pub fn new() -> Self {
        Trie {
            root: TrieNode::default(),
        }
    }

    pub fn insert(&mut self, word: String) {
        let mut node = &mut self.root;
        for &byte in word.as_bytes() {
            node = node.children.entry(byte).or_default();
            node.prefix_count += 1;
        }
        node.word_count += 1;
    }

    pub fn countWordsEqualTo(&mut self, word: String) -> i32 {
        let mut node = &self.root;
        for &byte in word.as_bytes() {
            match node.children.get(&byte) {
                Some(child) => node = child,
                None => return 0,
            }
        }
        node.word_count
    }

    pub fn countWordsStartingWith(&mut self, prefix: String) -> i32 {
        let mut node = &self.root;
        for &byte in prefix.as_bytes() {
            match node.children.get(&byte) {
                Some(child) => node = child,
                None => return 0,
            }
        }
        node.prefix_count
    }

    pub fn erase(&mut self, word: String) {
        let mut node = &self.root;
        for &byte in word.as_bytes() {
            match node.children.get(&byte) {
                Some(child) => node = child,
                None => return,
            }
        }
        if node.word_count == 0 {
            return;
        }
        let mut node = &mut self.root;
        for &byte in word.as_bytes() {
            node = node.children.get_mut(&byte).expect("confirmed by the first walk");
            node.prefix_count -= 1;
        }
        node.word_count -= 1;
    }
}
