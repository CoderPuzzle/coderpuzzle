impl Solution {
    pub fn count_digit_one(n: i32) -> i32 {
        let n = n as i64;
        if n <= 0 {
            return 0;
        }
        let mut count: i64 = 0;
        let mut factor: i64 = 1;
        // One iteration per decimal place: count numbers in 0..n whose
        // digit at this place is 1, with n split around the place as
        // higher / current / lower.
        while factor <= n {
            let higher = n / (factor * 10);
            let current = (n / factor) % 10;
            let lower = n % factor;
            // The place cycles 0-9 with period 10*factor, each full cycle
            // holding factor ones -> the higher*factor base term.
            if current == 0 {
                count += higher * factor;
            } else if current == 1 {
                // Partial cycle reached the 1 block: every lower value
                // counts, plus the zero case -> lower + 1 extra ones.
                count += higher * factor + lower + 1;
            } else {
                // Digit >= 2 covers the whole block of factor ones.
                count += (higher + 1) * factor;
            }
            factor *= 10;
        }
        count as i32
    }
}
