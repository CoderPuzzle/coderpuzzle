impl Solution {
    pub fn to_hexspeak(num: String) -> String {
        // Peel hex digits by repeated divmod — no format strings, so the
        // digit alphabet stays explicit: 0->O, 1->I, 10..15 -> A..F, and
        // digits 2..9 make the representation invalid.
        let mut digits: Vec<u32> = Vec::new();
        let mut n: u64 = num.parse().unwrap();
        loop {
            digits.push((n % 16) as u32);
            n /= 16;
            if n == 0 {
                break;
            }
        }
        let mut letters = String::new();
        for &r in digits.iter().rev() {
            if (2..=9).contains(&r) {
                return "ERROR".to_string();
            }
            letters.push(if r <= 1 {
                if r == 0 {
                    'O'
                } else {
                    'I'
                }
            } else {
                (b'A' + (r as u8) - 10) as char
            });
        }
        letters
    }
}
