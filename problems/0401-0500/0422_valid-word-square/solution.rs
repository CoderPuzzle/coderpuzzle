impl Solution {
    pub fn valid_word_square(words: Vec<String>) -> bool {
        // A word square mirrors across its diagonal with absence counted:
        // the character at (i, j) demands a same-character mirror at
        // (j, i), so row j must exist at all and reach back to column i.
        let count = words.len();
        for (i, row) in words.iter().enumerate() {
            for (j, ch) in row.as_bytes().iter().enumerate() {
                // Lowercase ASCII only, so byte comparison is character
                // comparison.
                if j >= count || i >= words[j].len() || &words[j].as_bytes()[i] != ch {
                    return false;
                }
            }
        }
        true
    }
}
