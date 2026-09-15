impl Solution {
    pub fn fraction_addition(expression: String) -> String {
        // One left-to-right scan reads each fraction: an optional sign, the
        // numerator's digits, '/', the denominator's digits. Fold it into the
        // running num/den by cross-multiplication - num/den +/- v/w =
        // (num*w +/- v*den)/(den*w) - integers only, never floats.
        let bytes = expression.as_bytes();
        let mut num: i64 = 0;
        let mut den: i64 = 1;
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
            while i < bytes.len() && bytes[i].is_ascii_digit() {
                value = value * 10 + i64::from(bytes[i] - b'0');
                i += 1;
            }
            i += 1; // the '/' between numerator and denominator
            let mut divisor: i64 = 0;
            while i < bytes.len() && bytes[i].is_ascii_digit() {
                divisor = divisor * 10 + i64::from(bytes[i] - b'0');
                i += 1;
            }
            num = num * divisor + sign * value * den;
            den *= divisor;
        }
        // Reduce once at the end. gcd(0, den) is den, so a zero sum collapses
        // to 0/1 and an integer keeps its denominator 1; the sign stays on
        // the numerator because den, a product of positives, is positive.
        let (mut a, mut b) = (num.abs(), den);
        while b != 0 {
            let rest = a % b;
            a = b;
            b = rest;
        }
        format!("{}/{}", num / a, den / a)
    }
}
