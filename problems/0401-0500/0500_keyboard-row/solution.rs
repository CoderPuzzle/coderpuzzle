impl Solution {
    pub fn find_words(words: Vec<String>) -> Vec<String> {
        // Both cases of a letter share one row, so a character's row is found
        // by lowercasing it and asking which of the three row listings
        // contains it. A word is typeable on one row iff no character ever
        // leaves the row its first character fixed, and it is kept in its own
        // casing.
        let rows = ["qwertyuiop", "asdfghjkl", "zxcvbnm"];
        let row_of = |ch: char| {
            rows.iter()
                .position(|letters| letters.contains(ch.to_ascii_lowercase()))
        };
        let mut result = Vec::with_capacity(words.len());
        for word in &words {
            let first_row = row_of(word.chars().next().unwrap());
            if word.chars().all(|ch| row_of(ch) == first_row) {
                result.push(word.clone());
            }
        }
        result
    }
}
