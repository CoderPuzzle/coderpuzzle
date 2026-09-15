impl Solution {
    pub fn sum_zero(n: i32) -> Vec<i32> {
        // Walk from -n/2 to n/2, skipping 0 for even n; every value pairs
        // with its negation so the array sums to zero with n distinct values.
        let half = n / 2;
        let mut result = Vec::with_capacity(n as usize);
        for value in -half..=half {
            if value == 0 && n % 2 == 0 {
                continue;
            }
            result.push(value);
        }
        result
    }
}
