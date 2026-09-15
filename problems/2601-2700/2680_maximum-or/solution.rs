impl Solution {
    // All k doublings belong on one element: the OR's top bit comes from
    // a single element, and giving that element every operation only
    // pushes its bits higher, so split plans are never better. The
    // boosted element reaches 10^9 * 2^15 < 2^45, past i32 range, so it
    // widens to i64 before shifting.
    pub fn maximum_or(nums: Vec<i32>, k: i32) -> i64 {
        let n = nums.len();
        // suffix[i] = OR of nums[i..], so the OR of every element except i
        // is prefix | suffix in O(1) while i sweeps left to right.
        let mut suffix = vec![0_i64; n + 1];
        for i in (0..n).rev() {
            suffix[i] = suffix[i + 1] | nums[i] as i64;
        }
        let mut best = 0_i64;
        let mut prefix = 0_i64;
        for i in 0..n {
            // The full OR with nums[i] << k swapped in for nums[i].
            let candidate = prefix | ((nums[i] as i64) << k) | suffix[i + 1];
            if candidate > best {
                best = candidate;
            }
            prefix |= nums[i] as i64;
        }
        best
    }
}
