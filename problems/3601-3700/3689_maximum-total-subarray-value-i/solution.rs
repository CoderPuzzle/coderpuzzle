impl Solution {
    pub fn max_total_value(nums: Vec<i32>, k: i32) -> i64 {
        // No subarray can beat the whole array: it sees only a subset of
        // the elements, so its maximum never exceeds the global maximum
        // and its minimum never drops below the global minimum. Repeating
        // the whole array as every pick attains that spread k times. The
        // spread reaches 10^9 and k reaches 10^5, so the product needs
        // i64 even though every element fits in i32.
        let lo = *nums.iter().min().unwrap();
        let hi = *nums.iter().max().unwrap();
        ((hi - lo) as i64) * (k as i64)
    }
}
