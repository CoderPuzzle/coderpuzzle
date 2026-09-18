use std::collections::HashMap;

struct TrieNode {
    children: HashMap<u8, TrieNode>, // byte order equals character order
    hotness: i32,
}

impl TrieNode {
    fn new() -> Self {
        TrieNode {
            children: HashMap::new(),
            hotness: 0,
        }
    }
}

pub struct AutocompleteSystem {
    root: TrieNode,
    typed: String,
}

impl AutocompleteSystem {
    pub fn new(sentences: Vec<String>, times: Vec<i32>) -> Self {
        let mut suggester = AutocompleteSystem {
            root: TrieNode::new(),
            typed: String::new(),
        };
        for (sentence, time) in sentences.into_iter().zip(times.into_iter()) {
            suggester.insert(&sentence, time);
        }
        suggester
    }

    pub fn input(&mut self, c: String) -> Vec<String> {
        if c == "#" {
            let typed = std::mem::take(&mut self.typed);
            self.insert(&typed, 1);
            return Vec::new();
        }
        self.typed.push_str(&c);
        // Descend from the root along everything typed so far; a miss
        // means no stored sentence carries this prefix.
        let mut node = &self.root;
        for byte in self.typed.bytes() {
            match node.children.get(&byte) {
                Some(child) => node = child,
                None => return Vec::new(),
            }
        }
        let mut matches: Vec<(String, i32)> = Vec::new();
        let mut prefix: Vec<u8> = self.typed.as_bytes().to_vec();
        collect(node, &mut prefix, &mut matches);
        // Hotter first, then the lexicographically smaller sentence.
        matches.sort_by(|a, b| b.1.cmp(&a.1).then_with(|| a.0.cmp(&b.0)));
        matches.into_iter().take(3).map(|(sentence, _)| sentence).collect()
    }

    fn insert(&mut self, sentence: &str, extra: i32) {
        let mut node = &mut self.root;
        for byte in sentence.bytes() {
            node = node.children.entry(byte).or_insert_with(TrieNode::new);
        }
        node.hotness += extra;
    }
}

// Walks the subtree under the typed prefix, collecting every stored
// sentence with its accumulated hotness.
fn collect(node: &TrieNode, prefix: &mut Vec<u8>, matches: &mut Vec<(String, i32)>) {
    if node.hotness > 0 {
        matches.push((String::from_utf8_lossy(prefix).into_owned(), node.hotness));
    }
    let mut characters: Vec<u8> = node.children.keys().copied().collect();
    characters.sort_unstable();
    for byte in characters {
        prefix.push(byte);
        collect(&node.children[&byte], prefix, matches);
        prefix.pop();
    }
}
