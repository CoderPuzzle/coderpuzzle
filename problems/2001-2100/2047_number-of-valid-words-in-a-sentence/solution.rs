impl Solution {
    pub fn count_valid_words(sentence: String) -> i32 {
        sentence
            .split_whitespace()
            .filter(|token| Self::is_valid(token))
            .count() as i32
    }

    fn is_valid(token: &str) -> bool {
        let bytes = token.as_bytes();
        let mut hyphens = 0;
        let mut punctuation = 0;

        for (index, &character) in bytes.iter().enumerate() {
            if character.is_ascii_lowercase() {
                continue;
            }
            if character == b'-' {
                hyphens += 1;
                if hyphens > 1
                    || index == 0
                    || index + 1 == bytes.len()
                    || !bytes[index - 1].is_ascii_lowercase()
                    || !bytes[index + 1].is_ascii_lowercase()
                {
                    return false;
                }
            } else if matches!(character, b'!' | b'.' | b',') {
                punctuation += 1;
                if punctuation > 1 || index + 1 != bytes.len() {
                    return false;
                }
            } else {
                return false;
            }
        }

        true
    }
}
