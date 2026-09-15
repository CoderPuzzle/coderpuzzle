impl Solution {
    // Find the first occurrence of ch; if it is absent the word is
    // returned unchanged. Otherwise flip word[0..i] byte-wise (the input
    // is lowercase ASCII, so bytes == chars) and return the rebuilt
    // string.
    pub fn reverse_prefix(word: String, ch: String) -> String {
        let Some(i) = word.find(ch.as_str()) else {
            return word;
        };
        let mut bytes = word.into_bytes();
        bytes[..=i].reverse();
        String::from_utf8(bytes).unwrap()
    }
}
