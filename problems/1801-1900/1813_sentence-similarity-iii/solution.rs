impl Solution {
    // The shorter word list must be covered by a common prefix plus a
    // common suffix of the longer one; whatever sits between them is
    // the inserted sentence.
    pub fn are_sentences_similar(sentence1: String, sentence2: String) -> bool {
        let w1: Vec<&str> = sentence1.split(' ').collect();
        let w2: Vec<&str> = sentence2.split(' ').collect();
        let mut i = 0;
        while i < w1.len() && i < w2.len() && w1[i] == w2[i] {
            i += 1;
        }
        let mut j = 0;
        while j < w1.len() - i && j < w2.len() - i && w1[w1.len() - 1 - j] == w2[w2.len() - 1 - j] {
            j += 1;
        }
        i + j >= w1.len().min(w2.len())
    }
}
