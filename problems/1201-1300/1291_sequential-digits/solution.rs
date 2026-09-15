impl Solution {
    pub fn sequential_digits(low: i32, high: i32) -> Vec<i32> {
        // A sequential number is fully determined by its first digit and
        // its length — at most 9 lengths x 9 starting digits minus the runs
        // that would pass 9. Slide a fixed-length window over "123456789"
        // for each length; every window cut is one candidate, already in
        // ascending order because longer windows only add larger values.
        const DIGITS: &[u8] = b"123456789";
        let mut result: Vec<i32> = Vec::new();
        for length in 2..=9usize {
            for start in 0..=(9 - length) {
                let mut value = 0i32;
                for &digit in &DIGITS[start..start + length] {
                    value = value * 10 + (digit - b'0') as i32;
                }
                if value > high {
                    break;
                }
                if value >= low {
                    result.push(value);
                }
            }
        }
        result
    }
}
