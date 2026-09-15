impl Solution {
    // Cut right after the k-th word: each space closes one word, so the
    // k-th space (when it exists) sits exactly at the cut point.
    pub fn truncate_sentence(s: String, k: i32) -> String {
        let bytes = s.as_bytes();
        let mut count = 0;
        for (i, &b) in bytes.iter().enumerate() {
            if b == b' ' {
                count += 1;
                if count == k {
                    return s[..i].to_string();
                }
            }
        }
        s
    }
}
