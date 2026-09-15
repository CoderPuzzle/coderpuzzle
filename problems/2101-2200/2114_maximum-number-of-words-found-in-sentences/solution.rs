impl Solution {
    pub fn most_words_found(sentences: Vec<String>) -> i32 {
        sentences
            .into_iter()
            .map(|sentence| sentence.bytes().filter(|&character| character == b' ').count() as i32 + 1)
            .max()
            .unwrap()
    }
}
