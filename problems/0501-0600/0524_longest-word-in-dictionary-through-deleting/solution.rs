impl Solution {
    // Deleting characters from s leaves a subsequence, so a word is formable
    // exactly when it is one. Walk s once, matching each word character at
    // its earliest legal position — greedy is safe, and the word forms iff
    // the pointer runs off its end.
    pub fn find_longest_word(s: String, dictionary: Vec<String>) -> String {
        let source = s.as_bytes();
        let mut best: &str = "";
        for word in &dictionary {
            let target = word.as_bytes();
            let mut i = 0;
            for &ch in source {
                if i < target.len() && ch == target[i] {
                    i += 1;
                }
            }
            let formable = i == target.len();
            // Longer wins; equal lengths go to the lexicographically smaller
            // word. The empty seed makes the no-answer case return "".
            if formable && (word.len() > best.len() || (word.len() == best.len() && word.as_str() < best)) {
                best = word;
            }
        }
        best.to_owned()
    }
}
