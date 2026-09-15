use std::collections::HashMap;

impl Solution {
    pub fn convert_number(s: String) -> String {
        // Trie over the ten digit words: each node owns a child map keyed
        // by letter plus the digit whose word ends there (empty when none).
        // No word is a prefix of another, so a walk from any position
        // crosses at most one terminal, and the first terminal reached is
        // exactly where the word ends.
        #[derive(Default)]
        struct TrieNode {
            children: HashMap<char, TrieNode>,
            digit: Option<char>,
        }
        let mut root = TrieNode::default();
        for (word, digit) in [
            ("zero", '0'),
            ("one", '1'),
            ("two", '2'),
            ("three", '3'),
            ("four", '4'),
            ("five", '5'),
            ("six", '6'),
            ("seven", '7'),
            ("eight", '8'),
            ("nine", '9'),
        ] {
            let mut node = &mut root;
            for ch in word.chars() {
                node = node.children.entry(ch).or_default();
            }
            node.digit = Some(digit);
        }
        let letters: Vec<char> = s.chars().collect();
        let n = letters.len();
        let mut digits: Vec<u8> = Vec::with_capacity(n / 3);
        let mut i = 0;
        while i < n {
            let mut node = &root;
            let mut j = i;
            let mut hit: Option<(usize, char)> = None;
            while j < n {
                match node.children.get(&letters[j]) {
                    None => break,
                    Some(child) => {
                        node = child;
                        j += 1;
                        if let Some(digit) = node.digit {
                            hit = Some((j, digit));
                            break;
                        }
                    }
                }
            }
            match hit {
                None => i += 1,
                Some((end, digit)) => {
                    digits.push(digit as u8);
                    i = end;
                }
            }
        }
        String::from_utf8(digits).unwrap()
    }
}
