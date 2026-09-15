// A lazy single-segment cursor over the compressed string: the iterator
// never expands anything, it holds the current segment's letter, how many
// copies of it are still unspent, and a parse position. next() spends one
// copy and re-parses the next letter-and-count only when the current one
// runs out; counts are read as i64 since a single segment may repeat a
// letter 10^9 times.
pub struct StringIterator {
    s: String,
    i: usize,
    ch: u8,
    count: i64,
}

impl StringIterator {
    pub fn new(compressedString: String) -> Self {
        StringIterator {
            s: compressedString,
            i: 0,
            ch: b' ',
            count: 0,
        }
    }

    // Load the next segment: one letter, then its run of digits.
    fn advance(&mut self) {
        let bytes = self.s.as_bytes();
        if self.i < bytes.len() {
            self.ch = bytes[self.i];
            self.i += 1;
            let mut parsed: i64 = 0;
            while self.i < bytes.len() && bytes[self.i].is_ascii_digit() {
                parsed = parsed * 10 + (bytes[self.i] - b'0') as i64;
                self.i += 1;
            }
            self.count = parsed;
        }
    }

    pub fn next(&mut self) -> String {
        if self.count == 0 {
            self.advance();
        }
        if self.count == 0 {
            // The parse position reached the end: exhausted for good.
            return " ".to_string();
        }
        self.count -= 1;
        (self.ch as char).to_string()
    }

    pub fn hasNext(&mut self) -> bool {
        // More to give whenever the current count is positive or an
        // unparsed segment remains (every segment's count is at least 1).
        self.count > 0 || self.i < self.s.len()
    }
}
