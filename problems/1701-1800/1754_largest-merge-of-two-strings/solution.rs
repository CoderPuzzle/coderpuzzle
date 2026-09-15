impl Solution {
    pub fn largest_merge(word1: String, word2: String) -> String {
        // Take the next character from whichever REMAINING string is
        // lexicographically larger — the suffix comparison settles not
        // just differing heads but the tie case.
        let a = word1.as_bytes();
        let b = word2.as_bytes();
        let mut out = Vec::with_capacity(a.len() + b.len());
        let (mut i, mut j) = (0usize, 0usize);
        while i < a.len() && j < b.len() {
            if a[i..] > b[j..] {
                out.push(a[i]);
                i += 1;
            } else {
                out.push(b[j]);
                j += 1;
            }
        }
        out.extend_from_slice(&a[i..]);
        out.extend_from_slice(&b[j..]);
        String::from_utf8(out).unwrap()
    }
}
