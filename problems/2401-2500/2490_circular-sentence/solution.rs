impl Solution {
    pub fn is_circular_sentence(sentence: String) -> bool {
        // A sentence is circular exactly when every space joins a matching
        // last-to-first pair and the endpoints wrap: sentence[0] is the
        // first character of the first word and the last byte the last
        // character of the last word. Bail out at the first broken junction.
        let b = sentence.as_bytes();
        for i in 0..b.len() {
            if b[i] == b' ' && b[i - 1] != b[i + 1] {
                return false;
            }
        }
        b[0] == b[b.len() - 1]
    }
}
