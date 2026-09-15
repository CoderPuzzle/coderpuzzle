impl Solution {
    // Every occurrence of every word paints its half-open interval onto a
    // boolean mask. Painting overlapping AND adjacent intervals onto one mask
    // merges them exactly as the two tag rules demand, so no interval
    // bookkeeping is needed. Occurrences come from a plain per-start compare
    // (a slice equality, memcmp speed) so the overlapping ones — "aa" inside
    // "aaa" at both 0 and 1 — are each found; a non-restarting search would
    // consume them.
    pub fn bold_words(s: String, words: Vec<String>) -> String {
        let source = s.as_bytes();
        let n = source.len();
        let mut bold = vec![false; n];
        for word in &words {
            let target = word.as_bytes();
            let length = target.len();
            if length == 0 || length > n {
                continue;
            }
            for i in 0..=n - length {
                if &source[i..i + length] == target {
                    bold[i..i + length].fill(true);
                }
            }
        }
        let mut result = String::new();
        for i in 0..n {
            if bold[i] && (i == 0 || !bold[i - 1]) {
                result.push_str("<b>");
            }
            result.push(source[i] as char);
            if bold[i] && (i + 1 == n || !bold[i + 1]) {
                result.push_str("</b>");
            }
        }
        result
    }
}
