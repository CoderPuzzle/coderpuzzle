impl Solution {
    pub fn smallest_value(n: i32) -> i32 {
        // Replace while the factor sum actually shrinks n: composites other
        // than 4 strictly decrease, primes and 4 are fixed points, so the
        // first non-shrinking value is the smallest n ever takes. Trial
        // division to the square root factors each intermediate value.
        let mut current = n;
        loop {
            let mut total = 0;
            let mut remaining = current;
            let mut d = 2;
            while d * d <= remaining {
                while remaining % d == 0 {
                    total += d;
                    remaining /= d;
                }
                d += 1;
            }
            if remaining > 1 {
                total += remaining;
            }
            if total >= current {
                return current;
            }
            current = total;
        }
    }
}
