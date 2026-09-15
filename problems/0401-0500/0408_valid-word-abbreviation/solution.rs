impl Solution {
    // Two indexes walk word and abbr together: a letter must match exactly,
    // a digit run is one skip, and both walks must end together.
    pub fn valid_word_abbreviation(word: String, abbr: String) -> bool {
        let (word, abbr) = (word.as_bytes(), abbr.as_bytes());
        let (mut i, mut j) = (0, 0);
        while i < word.len() && j < abbr.len() {
            let c = abbr[j];
            if c.is_ascii_digit() {
                // A digit run may not open with '0': that is a leading zero
                // (and a zero skip would replace an empty substring).
                if c == b'0' {
                    return false;
                }
                let mut skip = 0;
                // Consume the whole run: "12" and "55" are single skips, so
                // adjacent replacements can never masquerade as two.
                while j < abbr.len() && abbr[j].is_ascii_digit() {
                    skip = skip * 10 + (abbr[j] - b'0') as usize;
                    j += 1;
                }
                i += skip;
            } else {
                if word[i] != c {
                    return false;
                }
                i += 1;
                j += 1;
            }
        }
        // A skip past the end, leftover word, or leftover abbr all fail here.
        i == word.len() && j == abbr.len()
    }
}
