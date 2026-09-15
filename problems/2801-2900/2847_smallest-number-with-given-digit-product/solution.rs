impl Solution {
    pub fn smallest_number(n: String) -> String {
        // The wire carries n as decimal text; 10^18 fits easily in an i64.
        let mut value: i64 = n.parse().expect("n is a decimal integer");
        if value == 1 {
            return "1".to_string();
        }
        // Largest-first trial division packs the factors into as few digits
        // as possible and leaves the smallest remainders behind.
        let mut counts = [0usize; 10];
        for digit in (2..=9i64).rev() {
            while value % digit == 0 {
                counts[digit as usize] += 1;
                value /= digit;
            }
        }
        if value != 1 {
            return "-1".to_string();
        }
        let mut answer = String::new();
        for digit in 2..10 {
            for _ in 0..counts[digit] {
                answer.push((b'0' + digit as u8) as char);
            }
        }
        answer
    }
}
