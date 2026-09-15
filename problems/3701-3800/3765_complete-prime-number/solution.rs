impl Solution {
    pub fn complete_prime(num: i32) -> bool {
        // Test every prefix and every suffix for primality with trial
        // division on the 6k +- 1 wheel. At most ten digits means at most
        // eighteen slices, and each slice costs at most ~sqrt(num) / 3
        // division steps, so no sieve is ever needed. i64 intermediates
        // keep d * d and the pow10 products far from any overflow edge.
        let mut digits = [0i64; 10];
        let mut count = 0usize;
        let mut m = num as i64;
        while m > 0 {
            digits[count] = m % 10;
            count += 1;
            m /= 10;
        }
        let value = num as i64;
        let prime = |value: i64| -> bool {
            if value < 2 {
                return false;
            }
            if value < 4 {
                return true;
            }
            if value % 2 == 0 || value % 3 == 0 {
                return false;
            }
            let mut d: i64 = 5;
            while d * d <= value {
                if value % d == 0 || value % (d + 2) == 0 {
                    return false;
                }
                d += 6;
            }
            true
        };
        // prefixes: the first k digits, most-significant first; suffixes:
        // the last k digits. Both scans include the whole number itself.
        for head in (0..count).rev() {
            if !prime(value / Self::pow10(head as u32)) {
                return false;
            }
        }
        for k in 1..count {
            if !prime(value % Self::pow10(k as u32)) {
                return false;
            }
        }
        true
    }

    fn pow10(k: u32) -> i64 {
        10i64.pow(k)
    }
}
