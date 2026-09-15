// Counter-indexed tiny URLs: the object keeps every URL it has encoded,
// in order, and answers with "http://tinyurl.com/" plus the URL's 1-based
// position in that list written in lowercase base-36 — "1" for the first,
// "a" for the tenth, "10" for the 36th.
pub struct Codec {
    urls: Vec<String>,
}

impl Codec {
    pub fn new() -> Self {
        Codec { urls: Vec::new() }
    }

    pub fn encode(&mut self, longUrl: String) -> String {
        self.urls.push(longUrl);
        let digits = b"0123456789abcdefghijklmnopqrstuvwxyz";
        // divmod yields the least-significant digit first, so each new
        // digit is prepended — the loop ends with the most significant.
        let mut suffix = String::new();
        let mut position = self.urls.len();
        while position > 0 {
            suffix.insert(0, digits[position % 36] as char);
            position /= 36;
        }
        format!("http://tinyurl.com/{}", suffix)
    }

    pub fn decode(&mut self, shortUrl: String) -> String {
        let suffix = &shortUrl["http://tinyurl.com/".len()..];
        let mut position = 0usize;
        for byte in suffix.bytes() {
            let value = if byte <= b'9' { byte - b'0' } else { byte - b'a' + 10 };
            position = position * 36 + value as usize;
        }
        self.urls[position - 1].clone()
    }
}
