use std::collections::HashMap;

impl Solution {
    pub fn word_pattern_match(pattern: String, s: String) -> bool {
        // Depth-first walk over pattern positions with a two-way map:
        // forward (char -> word) keeps every later occurrence of the char
        // honest, backward (word -> char) enforces the bijection.
        let letters = pattern.as_bytes();
        let text = s.as_bytes();
        let mut char_to_word = HashMap::new();
        let mut word_to_char = HashMap::new();
        Self::match_words(letters, text, 0, 0, &mut char_to_word, &mut word_to_char)
    }

    fn match_words<'a>(
        pattern: &'a [u8],
        s: &'a [u8],
        pi: usize,
        si: usize,
        char_to_word: &mut HashMap<u8, &'a [u8]>,
        word_to_char: &mut HashMap<&'a [u8], u8>,
    ) -> bool {
        if pi == pattern.len() {
            // Every char placed: a match only when s is fully consumed.
            return si == s.len();
        }
        if si == s.len() {
            // Chars remain but s is exhausted; mappings are non-empty.
            return false;
        }
        let letter = pattern[pi];
        if let Some(&word) = char_to_word.get(&letter) {
            // A char already mapped must reproduce its word exactly.
            return s[si..].starts_with(word)
                && Self::match_words(pattern, s, pi + 1, si + word.len(), char_to_word, word_to_char);
        }
        for end in si + 1..=s.len() {
            let word = &s[si..end];
            // Bijection: the word is already another char's image.
            if word_to_char.contains_key(word) {
                continue;
            }
            char_to_word.insert(letter, word);
            word_to_char.insert(word, letter);
            if Self::match_words(pattern, s, pi + 1, end, char_to_word, word_to_char) {
                return true;
            }
            char_to_word.remove(&letter);
            word_to_char.remove(word);
        }
        false
    }
}
