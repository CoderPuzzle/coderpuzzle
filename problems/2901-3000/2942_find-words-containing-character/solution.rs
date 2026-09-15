impl Solution {
    // A word qualifies exactly when x occurs in it; contains answers that
    // in one call, so a single pass over words collects the matching
    // indices in order.
    pub fn find_words_containing(words: Vec<String>, x: String) -> Vec<i32> {
        let mut result = Vec::new();
        for (i, word) in words.iter().enumerate() {
            if word.contains(x.as_str()) {
                result.push(i as i32);
            }
        }
        result
    }
}
