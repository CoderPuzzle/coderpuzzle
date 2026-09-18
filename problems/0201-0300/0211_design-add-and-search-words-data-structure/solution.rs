struct TrieNode {
    children: [Option<Box<TrieNode>>; 26],
    end: bool,
}

impl TrieNode {
    fn empty() -> Self {
        TrieNode {
            children: Default::default(),
            end: false,
        }
    }
}

pub struct WordDictionary {
    root: Box<TrieNode>,
}

impl WordDictionary {
    pub fn new() -> Self {
        WordDictionary {
            root: Box::new(TrieNode::empty()),
        }
    }

    pub fn addWord(&mut self, word: String) {
        let mut node = &mut *self.root;
        for letter in word.bytes() {
            let slot = (letter - b'a') as usize;
            let child = node.children[slot].get_or_insert_with(|| Box::new(TrieNode::empty()));
            node = &mut **child;
        }
        node.end = true;
    }

    pub fn search(&mut self, word: String) -> bool {
        Self::match_word(&self.root, word.as_bytes(), 0)
    }

    // A letter descends its single slot; a dot tries every non-empty slot.
    fn match_word(node: &TrieNode, word: &[u8], index: usize) -> bool {
        if index == word.len() {
            return node.end;
        }
        let letter = word[index];
        if letter == b'.' {
            return node.children.iter().any(|child| {
                child
                    .as_ref()
                    .map_or(false, |child| Self::match_word(child, word, index + 1))
            });
        }
        match &node.children[(letter - b'a') as usize] {
            Some(child) => Self::match_word(child, word, index + 1),
            None => false,
        }
    }
}
