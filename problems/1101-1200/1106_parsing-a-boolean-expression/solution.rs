impl Solution {
    pub fn parse_bool_expr(expression: String) -> bool {
        Self::parse(expression.as_bytes(), 0).0
    }

    fn parse(expr: &[u8], mut index: usize) -> (bool, usize) {
        let ch = expr[index];
        if ch == b't' {
            return (true, index + 1);
        }
        if ch == b'f' {
            return (false, index + 1);
        }
        let op = ch;
        index += 2; // skip the operator and '('
        let mut values: Vec<bool> = Vec::new();
        loop {
            let (value, next) = Self::parse(expr, index);
            values.push(value);
            index = next;
            if expr[index] == b',' {
                index += 1;
            } else {
                // ')'
                index += 1;
                break;
            }
        }
        if op == b'!' {
            return (!values[0], index);
        }
        if op == b'&' {
            return (values.iter().all(|&value| value), index);
        }
        (values.iter().any(|&value| value), index)
    }
}
