use std::collections::HashSet;

pub struct Trie {
    // One set of whole words, one set of every beginning of every word;
    // nothing is shared between words beyond accidental hash collisions.
    words: HashSet<String>,
    prefixes: HashSet<String>,
}

impl Trie {
    pub fn new() -> Self {
        Trie {
            words: HashSet::new(),
            prefixes: HashSet::new(),
        }
    }

    pub fn insert(&mut self, word: String) {
        self.words.insert(word.clone());
        // Record every beginning, the word itself included — a word begins
        // with itself, so it is its own longest prefix.
        for end in 1..=word.len() {
            self.prefixes.insert(word[..end].to_string());
        }
    }

    pub fn search(&mut self, word: String) -> bool {
        self.words.contains(&word)
    }

    pub fn startsWith(&mut self, prefix: String) -> bool {
        self.prefixes.contains(&prefix)
    }
}
