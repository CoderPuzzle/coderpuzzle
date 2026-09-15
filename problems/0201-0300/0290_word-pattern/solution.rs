use std::collections::HashMap;

impl Solution {
    pub fn word_pattern(pattern: String, s: String) -> bool {
        // The pattern holds under a bijection: each letter names exactly one
        // word, and no two letters share a word. Each clause is one map,
        // checked together in a single pass over letter/word pairs.
        let words: Vec<&str> = s.split(' ').collect();
        if pattern.len() != words.len() {
            // With counts different, letters and words cannot pair one-to-one.
            return false;
        }
        let mut letter_to_word: HashMap<u8, &str> = HashMap::new();
        let mut word_to_letter: HashMap<&str, u8> = HashMap::new();
        for (letter, word) in pattern.bytes().zip(words) {
            // One branch per direction: the letter already names a different
            // word, or the word is already claimed by a different letter.
            if let Some(&bound) = letter_to_word.get(&letter) {
                if bound != word {
                    return false;
                }
            }
            if let Some(&owner) = word_to_letter.get(word) {
                if owner != letter {
                    return false;
                }
            }
            letter_to_word.insert(letter, word);
            word_to_letter.insert(word, letter);
        }
        true
    }
}
