impl Solution {
    pub fn min_cutting_cost(n: i32, m: i32, k: i32) -> i64 {
        // n, m <= 2k and transport is always possible, so at most one log
        // exceeds k; each such log must be cut once, and both pieces must
        // fit a truck (<= k). The split a + (L - a) with a in [L-k, k]
        // minimizes the product a * (L - a) at the ends of that range,
        // giving k * (L - k). Logs of length <= k ride for free. The cost
        // reaches k * k = 10^10, so it is summed in 64-bit.
        let mut cost = 0i64;
        for log in [n, m] {
            if log > k {
                cost += (log - k) as i64 * k as i64;
            }
        }
        cost
    }
}
