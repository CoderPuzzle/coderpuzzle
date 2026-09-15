impl Solution {
    pub fn closest_fair(n: i32) -> i32 {
        // A fair integer needs an even digit count with half of the digits
        // odd. When the digit count is odd no fair integer exists with that
        // many digits, so the answer is the smallest fair number with one
        // more digit: a leading 1, then half zeros and half-1 ones (balanced
        // by construction and minimal).
        fn is_fair(mut x: i64) -> bool {
            let (mut odd, mut length) = (0, 0);
            while x > 0 {
                if x % 10 % 2 == 1 {
                    odd += 1;
                }
                length += 1;
                x /= 10;
            }
            length % 2 == 0 && odd * 2 == length
        }
        let digits = n.to_string().len();
        if digits % 2 == 1 {
            let half = (digits + 1) / 2;
            let s = "1".to_string() + &"0".repeat(half) + &"1".repeat(half - 1);
            return s.parse().unwrap();
        }
        // Even digit count: the next fair integer is close, so scan upward.
        let limit = 10i64.pow(digits as u32);
        for k in (n as i64)..limit {
            if is_fair(k) {
                return k as i32;
            }
        }
        let half = (digits + 2) / 2;
        let s = "1".to_string() + &"0".repeat(half) + &"1".repeat(half - 1);
        s.parse().unwrap()
    }
}
