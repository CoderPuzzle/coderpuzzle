use std::collections::HashMap;

struct TrieNode {
    children: HashMap<u8, usize>,
    word: bool,
}

pub struct StreamChecker {
    nodes: Vec<TrieNode>, // arena; index 0 is the root
    trail: Vec<usize>,    // trie nodes the live attempts sit on
}

impl StreamChecker {
    pub fn new(words: Vec<String>) -> Self {
        let mut nodes = vec![TrieNode {
            children: HashMap::new(),
            word: false,
        }];
        for word in words {
            let mut node = 0;
            for &letter in word.as_bytes() {
                let next = match nodes[node].children.get(&letter) {
                    Some(&next) => next,
                    None => {
                        let next = nodes.len();
                        nodes.push(TrieNode {
                            children: HashMap::new(),
                            word: false,
                        });
                        nodes[node].children.insert(letter, next);
                        next
                    }
                };
                node = next;
            }
            nodes[node].word = true;
        }
        StreamChecker { nodes, trail: vec![0] }
    }

    pub fn query(&mut self, letter: String) -> bool {
        let letter = letter.as_bytes()[0];
        let mut advanced = Vec::with_capacity(self.trail.len());
        let mut hit = false;
        for &node in &self.trail {
            // index 0 is always the root
            if let Some(&child) = self.nodes[node].children.get(&letter) {
                advanced.push(child);
                hit = hit || self.nodes[child].word;
            }
        }
        advanced.push(0); // a fresh suffix begins every feed
        self.trail = advanced;
        hit
    }
}
