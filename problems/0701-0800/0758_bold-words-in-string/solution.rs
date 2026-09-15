impl Solution {
    pub fn bold_words(words: Vec<String>, s: String) -> String {
        // Mark every position of s covered by any keyword occurrence.
        let n = s.len();
        let mut mask = vec![false; n];
        for word in &words {
            // Restart one past each hit so self-overlapping occurrences
            // ("aa" inside "aaa") are all found.
            let mut from = 0;
            while let Some(rel) = s[from..].find(word.as_str()) {
                let start = from + rel;
                let end = start + word.len();
                for slot in &mut mask[start..end] {
                    *slot = true;
                }
                from = start + 1;
            }
        }
        // Wrap each maximal run of marked positions in exactly one pair.
        let mut out = String::with_capacity(n + 16);
        for (i, ch) in s.char_indices() {
            if mask[i] && (i == 0 || !mask[i - 1]) {
                out.push_str("<b>");
            } else if !mask[i] && i > 0 && mask[i - 1] {
                out.push_str("</b>");
            }
            out.push(ch);
        }
        if n > 0 && mask[n - 1] {
            out.push_str("</b>");
        }
        out
    }
}
