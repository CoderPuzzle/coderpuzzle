impl Solution {
    pub fn merge_alternately(word1: String, word2: String) -> String {
        // One pointer per word: emit alternately while both words still
        // have characters, then append whichever tail remains.
        let mut out = String::with_capacity(word1.len() + word2.len());
        let (a, b) = (word1.as_bytes(), word2.as_bytes());
        let (mut i, mut j) = (0, 0);
        while i < a.len() && j < b.len() {
            out.push(a[i] as char);
            out.push(b[j] as char);
            i += 1;
            j += 1;
        }
        out.push_str(&word1[i..]);
        out.push_str(&word2[j..]);
        out
    }
}
