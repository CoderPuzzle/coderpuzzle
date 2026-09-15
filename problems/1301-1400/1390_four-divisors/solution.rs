impl Solution {
    pub fn sum_four_divisors(nums: Vec<i32>) -> i32 {
        // Divisors pair up around the square root, so one scan to isqrt(n)
        // sees them all: each hit contributes d and n/d (collapsed to one
        // when d*d == n). Track count and sum together and add the sum only
        // for numbers landing on exactly four divisors.
        let mut total: i64 = 0;
        for &n in &nums {
            let n = n as i64;
            let mut count = 0;
            let mut divisor_sum = 0i64;
            let mut d = 1i64;
            while d * d <= n {
                if n % d == 0 {
                    if d * d == n {
                        count += 1;
                        divisor_sum += d;
                    } else {
                        count += 2;
                        divisor_sum += d + n / d;
                    }
                }
                d += 1;
            }
            if count == 4 {
                total += divisor_sum;
            }
        }
        total as i32
    }
}
