impl Solution {
    pub fn closest_divisors(num: i32) -> Vec<i32> {
        // The closest pair for a product m has its smaller factor as large
        // as possible: the first divisor found walking down from isqrt(m).
        fn closest(m: i64) -> Vec<i32> {
            let mut d = (m as f64).sqrt() as i64;
            while d * d > m {
                d -= 1;
            }
            while (d + 1) * (d + 1) <= m && m % (d + 1) == 0 {
                d += 1;
            }
            while m % d != 0 {
                d -= 1;
            }
            vec![d as i32, (m / d) as i32]
        }
        let a = closest(num as i64 + 1);
        let b = closest(num as i64 + 2);
        if a[1] - a[0] <= b[1] - b[0] {
            a
        } else {
            b
        }
    }
}
