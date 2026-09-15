impl Solution {
    // An element v needs ceil(v / k) reduce-by-k operations, so
    // nonPositive(nums, k) is the sum of those ceilings. Feasibility is
    // monotone in k: every ceiling only shrinks as k grows while k * k
    // strictly grows, so binary search finds the smallest feasible k.
    // Totals reach 1e5 * 1e5 = 1e10 and squares of k reach 1e10 as well,
    // beyond i32, so the accumulation and the square run in i64.
    pub fn minimum_k(nums: Vec<i32>) -> i32 {
        let feasible = |k: i64| -> bool {
            let mut total: i64 = 0;
            for &value in &nums {
                total += (i64::from(value) + k - 1) / k;
            }
            total <= k * k
        };
        // Warm-up: once k >= max(nums) every ceiling is exactly 1, so
        // nonPositive(nums, k) == n there; doubling max(nums) until
        // feasible stops at the first power-of-two multiple with
        // k * k >= n.
        let mut hi: i64 = i64::from(*nums.iter().max().unwrap());
        while !feasible(hi) {
            hi *= 2;
        }
        let mut lo: i64 = 1;
        while lo < hi {
            let mid = (lo + hi) / 2;
            if feasible(mid) {
                hi = mid;
            } else {
                lo = mid + 1;
            }
        }
        lo as i32
    }
}
