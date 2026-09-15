impl Solution {
    // One alphabet serves both bases: base 16 stops at 'F', base 36 at 'Z'.
    pub fn concat_hex36(n: i32) -> String {
        let alphabet: &[u8] = b"0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        let hex = Self::to_base(n as i64 * n as i64, 16, alphabet);
        let base36 = Self::to_base(n as i64 * n as i64 * n as i64, 36, alphabet);
        format!("{hex}{base36}")
    }

    fn to_base(mut x: i64, b: i64, alphabet: &[u8]) -> String {
        // n >= 1 makes x >= 1, so the loop always emits at least one digit.
        let mut digits: Vec<u8> = Vec::new();
        while x != 0 {
            digits.push(alphabet[(x % b) as usize]);
            x /= b;
        }
        // Digits come out lowest-first, so reverse for the answer.
        digits.reverse();
        String::from_utf8(digits).unwrap()
    }
}
