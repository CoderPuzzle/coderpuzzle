impl Solution {
    pub fn count_symmetric_integers(low: i32, high: i32) -> i32 {
        // An even-length decimal string is symmetric exactly when its two
        // halves have equal digit sums; odd-length numbers are never
        // symmetric. Digit counts stay below 6 on the constraint domain.
        let mut count = 0;
        for value in low..=high {
            let digits = value.to_string();
            let bytes = digits.as_bytes();
            let n = bytes.len() as i32;
            if n % 2 != 0 {
                continue;
            }
            let half = (n / 2) as usize;
            let mut first_sum = 0;
            let mut last_sum = 0;
            for i in 0..half {
                first_sum += (bytes[i] - b'0') as i32;
                last_sum += (bytes[half + i] - b'0') as i32;
            }
            if first_sum == last_sum {
                count += 1;
            }
        }
        count
    }
}
