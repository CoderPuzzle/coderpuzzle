struct TrieNode {
    children: [Option<Box<TrieNode>>; 26],
    end: bool,
}

impl TrieNode {
    fn new() -> Self {
        TrieNode {
            children: Default::default(),
            end: false,
        }
    }
}

// The dictionary spelled down a trie; each buildDict REPLACES the previous
// tree, so search only ever sees the latest call's words. The child
// holding the query's own letter continues for free, any other child spends
// the single change, and success means a flagged node at the query's end
// with the change spent.
pub struct MagicDictionary {
    root: TrieNode,
}

impl MagicDictionary {
    pub fn new() -> Self {
        MagicDictionary { root: TrieNode::new() }
    }

    pub fn buildDict(&mut self, dictionary: Vec<String>) {
        let mut root = TrieNode::new();
        for word in dictionary {
            let mut node = &mut root;
            for letter in word.bytes() {
                let slot = (letter - b'a') as usize;
                if node.children[slot].is_none() {
                    node.children[slot] = Some(Box::new(TrieNode::new()));
                }
                node = node.children[slot].as_mut().unwrap();
            }
            node.end = true;
        }
        self.root = root;
    }

    pub fn search(&mut self, searchWord: String) -> bool {
        Self::descend(&self.root, searchWord.as_bytes(), 0, 1)
    }

    // The child holding the query's own letter continues for free; any
    // other child spends the single change, and success means a flagged
    // node at the query's end with the change spent.
    fn descend(node: &TrieNode, word: &[u8], index: usize, edits_left: i32) -> bool {
        if index == word.len() {
            return node.end && edits_left == 0;
        }
        let wanted = (word[index] - b'a') as usize;
        for slot in 0..26 {
            if let Some(child) = node.children[slot].as_deref() {
                let mut remaining = edits_left;
                if slot != wanted {
                    remaining -= 1;
                }
                if remaining >= 0 && Self::descend(child, word, index + 1, remaining) {
                    return true;
                }
            }
        }
        false
    }
}
