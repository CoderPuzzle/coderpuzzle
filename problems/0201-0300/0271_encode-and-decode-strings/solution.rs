// Length-prefixed chunks: each string travels as its decimal length, a
// colon, then the string itself, concatenated in order. The prefix says
// exactly how many characters belong to the piece, so no colon or digit
// inside a string can be mistaken for structure.
pub struct Codec;

impl Codec {
    pub fn new() -> Self {
        Codec
    }

    pub fn encode(&mut self, strs: Vec<String>) -> String {
        let mut out = String::new();
        for word in strs {
            out.push_str(&word.len().to_string());
            out.push(':');
            out.push_str(&word);
        }
        out
    }

    // The mirror walk: digits up to the next colon are the decimal length,
    // that many characters are the next string, and the cursor lands on
    // the following length.
    pub fn decode(&mut self, s: String) -> Vec<String> {
        let bytes = s.as_bytes();
        let mut words: Vec<String> = Vec::new();
        let mut position = 0;
        while position < bytes.len() {
            let colon = position + bytes[position..].iter().position(|&b| b == b':').unwrap();
            let length: usize = s[position..colon].parse().unwrap();
            words.push(s[colon + 1..colon + 1 + length].to_string());
            position = colon + 1 + length;
        }
        words
    }
}
