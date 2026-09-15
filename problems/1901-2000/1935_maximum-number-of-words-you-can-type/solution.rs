use std::collections::HashSet;

impl Solution {
    pub fn can_be_typed_words(text: String, broken_letters: String) -> i32 {
        // Broken keys form a set; a word is typable only when none of its
        // letters are in that set.
        let broken: HashSet<char> = broken_letters.chars().collect();
        text.split(' ')
            .filter(|word| word.chars().all(|ch| !broken.contains(&ch)))
            .count() as i32
    }
}
