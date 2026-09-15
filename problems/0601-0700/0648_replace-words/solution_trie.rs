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

    fn insert(&mut self, word: &str) {
        let mut node = self;
        for letter in word.bytes() {
            let slot = (letter - b'a') as usize;
            if node.children[slot].is_none() {
                node.children[slot] = Some(Box::new(TrieNode::new()));
            }
            node = node.children[slot].as_mut().unwrap();
        }
        node.end = true;
    }
}

impl Solution {
    pub fn replace_words(dictionary: Vec<String>, sentence: String) -> String {
        // The trie stores every root once; a node's `end` marks that a root
        // stops exactly there. Walking a word's own letters visits its
        // prefixes shortest first, so the first `end` on the path is the
        // shortest matching root — no per-length retries, and no length cap:
        // the tree has no branches deeper than the longest root anyway.
        let mut trie = TrieNode::new();
        for root in &dictionary {
            trie.insert(root);
        }
        // A walk that falls off the tree, or finishes without ever reaching
        // an `end`, found no root prefix — the word stands for itself.
        let mut replaced: Vec<&str> = Vec::new();
        for word in sentence.split(' ') {
            let mut replacement = word;
            let mut node = &trie;
            for (length, letter) in word.bytes().enumerate() {
                node = match node.children[(letter - b'a') as usize].as_deref() {
                    Some(child) => child,
                    None => break,
                };
                if node.end {
                    replacement = &word[..length + 1];
                    break;
                }
            }
            replaced.push(replacement);
        }
        replaced.join(" ")
    }
}
