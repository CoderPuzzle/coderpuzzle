// Two tries, one word list per node: a prefix trie spelling every word
// forward and a suffix trie spelling every word reversed, so a suffix
// reads down it front to back. Words are inserted in index order, so
// every node's list ascends, and f() walks pref down the first
// trie and suff reversed down the second, then merges the two hit nodes'
// lists from their tails -- the first equal pair is the largest shared
// index, and a walk that falls off its trie means no word matches that
// half, answering -1.
pub struct WordFilter {
    prefixes: TrieNode,
    suffixes: TrieNode,
}

struct TrieNode {
    children: [Option<Box<TrieNode>>; 26],
    indices: Vec<i32>,
}

impl TrieNode {
    fn new() -> Self {
        // One trie node: 26 child slots indexed by c - 'a' plus the
        // indices of every word whose path crosses it.
        TrieNode {
            children: Default::default(),
            indices: Vec::new(),
        }
    }
}

impl WordFilter {
    pub fn new(words: Vec<String>) -> Self {
        let mut design = WordFilter {
            prefixes: TrieNode::new(),
            suffixes: TrieNode::new(),
        };
        for (index, word) in words.iter().enumerate() {
            let index = index as i32;
            let mut node = &mut design.prefixes;
            for letter in word.bytes() {
                node = node.children[(letter - b'a') as usize].get_or_insert_with(|| Box::new(TrieNode::new()));
                node.indices.push(index);
            }
            node = &mut design.suffixes;
            for letter in word.bytes().rev() {
                node = node.children[(letter - b'a') as usize].get_or_insert_with(|| Box::new(TrieNode::new()));
                node.indices.push(index);
            }
        }
        design
    }

    // Walks pref down the prefix trie; None as soon as a slot is empty.
    fn walk(&self, pref: &str) -> Option<&TrieNode> {
        let mut node = &self.prefixes;
        for letter in pref.bytes() {
            node = node.children[(letter - b'a') as usize].as_deref()?;
        }
        Some(node)
    }

    // Walks suff down the suffix trie, whose edges spell the reversed
    // words, so the characters are consumed from the end; None as soon as
    // a slot is empty.
    fn walk_reversed(&self, suff: &str) -> Option<&TrieNode> {
        let mut node = &self.suffixes;
        for letter in suff.bytes().rev() {
            node = node.children[(letter - b'a') as usize].as_deref()?;
        }
        Some(node)
    }

    pub fn f(&mut self, pref: String, suff: String) -> i32 {
        let forward = match self.walk(&pref) {
            Some(node) => node,
            None => return -1,
        };
        let backward = match self.walk_reversed(&suff) {
            Some(node) => node,
            None => return -1,
        };
        // Both lists ascend, so the merge starts at their tails: the side
        // holding the larger index steps down, and the first equal pair is
        // the largest index shared by both.
        let mut left = forward.indices.len() as isize - 1;
        let mut right = backward.indices.len() as isize - 1;
        while left >= 0 && right >= 0 {
            let front = forward.indices[left as usize];
            let back = backward.indices[right as usize];
            if front == back {
                return front;
            }
            if front > back {
                left -= 1;
            } else {
                right -= 1;
            }
        }
        -1
    }
}
