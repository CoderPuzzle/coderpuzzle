impl Solution {
    pub fn solve_equation(equation: String) -> String {
        // Split at the one '=' and reduce each side to a*x + b with a single
        // scan. A term is an optional sign, digits (empty before an 'x' means
        // coefficient 1), and a possible trailing 'x'; '0x' contributes a zero
        // coefficient and drops out by itself.
        let eq = equation.find('=').expect("exactly one '='");
        let (la, lb) = Self::parse_side(&equation[..eq]);
        let (ra, rb) = Self::parse_side(&equation[eq + 1..]);
        // la*x + lb = ra*x + rb -> (la - ra)*x = rb - lb. A zero coefficient
        // leaves either every x or no x; otherwise the division is exact.
        let a = la - ra;
        let b = rb - lb;
        if a == 0 {
            return if b == 0 { "Infinite solutions" } else { "No solution" }.to_string();
        }
        format!("x={}", b / a)
    }

    fn parse_side(side: &str) -> (i64, i64) {
        let bytes = side.as_bytes();
        let mut a: i64 = 0;
        let mut b: i64 = 0;
        let mut i = 0;
        while i < bytes.len() {
            let mut sign = 1i64;
            let mark = bytes[i];
            if mark == b'+' || mark == b'-' {
                if mark == b'-' {
                    sign = -1;
                }
                i += 1;
            }
            let mut value: i64 = 0;
            let mut has_digits = false;
            while i < bytes.len() && bytes[i].is_ascii_digit() {
                value = value * 10 + i64::from(bytes[i] - b'0');
                has_digits = true;
                i += 1;
            }
            if i < bytes.len() && bytes[i] == b'x' {
                a += sign * if has_digits { value } else { 1 };
                i += 1;
            } else {
                b += sign * value;
            }
        }
        (a, b)
    }
}
