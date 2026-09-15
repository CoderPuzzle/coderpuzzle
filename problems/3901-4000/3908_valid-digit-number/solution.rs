impl Solution {
    pub fn valid_digit(n: i32, x: i32) -> bool {
        let digits = n.to_string();
        let target = b'0' + x as u8;
        digits.bytes().any(|digit| digit == target) && digits.as_bytes()[0] != target
    }
}
