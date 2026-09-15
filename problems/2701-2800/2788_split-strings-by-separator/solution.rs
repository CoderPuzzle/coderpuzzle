impl Solution {
    pub fn split_words_by_separator(words: Vec<String>, separator: String) -> Vec<String> {
        // Split each word at every occurrence of separator and keep the non-empty
        // pieces: leading/trailing separators give empty edge pieces and adjacent
        // ones empty middle pieces; the statement excludes empties, so appending
        // the survivors in walk order yields exactly the required strings.
        let mut result = Vec::new();
        for word in &words {
            for piece in word.split(separator.as_str()) {
                if !piece.is_empty() {
                    result.push(piece.to_string());
                }
            }
        }
        result
    }
}
