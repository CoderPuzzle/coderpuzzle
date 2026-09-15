impl Solution {
    pub fn reformat(s: String) -> String {
        let mut letters: Vec<u8> = Vec::with_capacity(s.len());
        let mut digits: Vec<u8> = Vec::with_capacity(s.len());
        for &c in s.as_bytes() {
            if c.is_ascii_digit() {
                digits.push(c);
            } else {
                letters.push(c);
            }
        }
        let diff = letters.len() as i64 - digits.len() as i64;
        if diff > 1 || diff < -1 {
            return String::new();
        }
        let (first, second) = if diff >= 0 {
            (&letters, &digits)
        } else {
            (&digits, &letters)
        };
        let mut result = Vec::with_capacity(s.len());
        for i in 0..first.len() {
            result.push(first[i]);
            if i < second.len() {
                result.push(second[i]);
            }
        }
        String::from_utf8(result).unwrap()
    }
}
