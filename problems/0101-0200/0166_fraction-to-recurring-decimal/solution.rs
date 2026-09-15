use std::collections::HashMap;

impl Solution {
    pub fn fraction_to_decimal(numerator: i32, denominator: i32) -> String {
        // MinInt32 has no positive 32-bit counterpart, so widen before
        // magnitudes; every later intermediate is a remainder below 2^31
        // times 10.
        let n = (numerator as i64).abs();
        let d = (denominator as i64).abs();
        // Magnitudes in, sign out: "-" is prepended once, and never on a zero
        // result (0 over a negative denominator must not become "-0").
        let mut result = String::new();
        if (numerator < 0) != (denominator < 0) && n != 0 {
            result.push('-');
        }
        result.push_str(&(n / d).to_string());
        let mut remainder = n % d;
        if remainder == 0 {
            return result;
        }
        result.push('.');
        // Remainder -> position of the fraction digit it produced; the first
        // remainder seen twice opens the recurring parentheses at its position.
        let mut seen: HashMap<i64, usize> = HashMap::new();
        let mut fraction = String::new();
        while remainder != 0 {
            if let Some(&start) = seen.get(&remainder) {
                // Everything from that position recurs: close the cycle there.
                fraction.insert(start, '(');
                fraction.push(')');
                break;
            }
            seen.insert(remainder, fraction.len());
            remainder *= 10;
            fraction.push((b'0' + (remainder / d) as u8) as char);
            remainder %= d;
        }
        result + &fraction
    }
}
