// Cursor over the expression's bytes; the three parse_* methods below mirror
// the expr/term/factor grammar directly.
struct Parser<'a> {
    bytes: &'a [u8],
    pos: usize,
}

impl<'a> Parser<'a> {
    fn parse_expr(&mut self) -> i64 {
        let mut value = self.parse_term();
        while self.pos < self.bytes.len() && matches!(self.bytes[self.pos], b'+' | b'-') {
            let op = self.bytes[self.pos];
            self.pos += 1;
            let rhs = self.parse_term();
            value = if op == b'+' { value + rhs } else { value - rhs };
        }
        value
    }

    fn parse_term(&mut self) -> i64 {
        let mut value = self.parse_factor();
        while self.pos < self.bytes.len() && matches!(self.bytes[self.pos], b'*' | b'/') {
            let op = self.bytes[self.pos];
            self.pos += 1;
            let rhs = self.parse_factor();
            value = if op == b'*' { value * rhs } else { value / rhs }; // Rust's / truncates toward zero.
        }
        value
    }

    fn parse_factor(&mut self) -> i64 {
        if self.bytes[self.pos] == b'(' {
            self.pos += 1;
            let value = self.parse_expr();
            self.pos += 1; // skip ')'
            return value;
        }
        let value = (self.bytes[self.pos] - b'0') as i64;
        self.pos += 1;
        value
    }
}

impl Solution {
    pub fn build_and_evaluate(s: String) -> i64 {
        let mut parser = Parser {
            bytes: s.as_bytes(),
            pos: 0,
        };
        parser.parse_expr()
    }
}
