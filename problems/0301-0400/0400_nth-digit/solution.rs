impl Solution {
    pub fn find_nth_digit(n: i32) -> i32 {
        // The sequence splits into blocks by digit length: the 1-digit
        // numbers contribute 9 digits, the 2-digit numbers 180, the
        // 3-digit numbers 2700 — the d-digit block contributes
        // 9 * 10^(d-1) * d. Subtract whole blocks until n lands inside
        // block d, whose numbers start at 10^(d-1); the digit then
        // belongs to base + (n - 1) / d, at offset (n - 1) % d inside it.
        let mut remaining = n as i64;
        let mut digits = 1i64;
        let mut base = 1i64;
        let mut block = 9i64;
        while remaining > block {
            remaining -= block;
            digits += 1;
            base *= 10;
            block = 9 * base * digits;
        }
        let number = base + (remaining - 1) / digits;
        let text = number.to_string();
        (text.as_bytes()[((remaining - 1) % digits) as usize] - b'0') as i32
    }
}
