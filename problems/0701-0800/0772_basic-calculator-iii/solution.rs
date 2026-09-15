impl Solution {
    pub fn calculate(s: String) -> i32 {
        let bytes = s.as_bytes();
        let mut i = 0usize;
        Self::expr(bytes, &mut i) as i32
    }

    fn expr(b: &[u8], i: &mut usize) -> i64 {
        let mut value = Self::term(b, i);
        while *i < b.len() && (b[*i] == b'+' || b[*i] == b'-') {
            let op = b[*i];
            *i += 1;
            let rhs = Self::term(b, i);
            value = if op == b'+' { value + rhs } else { value - rhs };
        }
        value
    }

    fn term(b: &[u8], i: &mut usize) -> i64 {
        let mut value = Self::factor(b, i);
        while *i < b.len() && (b[*i] == b'*' || b[*i] == b'/') {
            let op = b[*i];
            *i += 1;
            let rhs = Self::factor(b, i);
            value = if op == b'*' { value * rhs } else { value / rhs };
        }
        value
    }

    fn factor(b: &[u8], i: &mut usize) -> i64 {
        if b[*i] == b'(' {
            *i += 1;
            let value = Self::expr(b, i);
            *i += 1; // closing ')'
            return value;
        }
        let mut value = 0i64;
        while *i < b.len() && b[*i].is_ascii_digit() {
            value = value * 10 + (b[*i] - b'0') as i64;
            *i += 1;
        }
        value
    }
}
