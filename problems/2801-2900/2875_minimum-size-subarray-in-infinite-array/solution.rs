use std::collections::HashMap;

impl Solution {
    // Splits target into k full copies plus a remainder: any n consecutive
    // elements of the infinite array sum to total, so a remainder hit is a
    // window of length < n with sum rem, and one doubled copy contains
    // every such window for every start phase. Prefix sums reach
    // 2 * sum(nums) = 2 * 10^10, past i32 range, so they widen to i64; the
    // answer itself stays below k * n + 2n <= target + 2 * 10^5 < 2^31.
    pub fn min_size_subarray(nums: Vec<i32>, target: i32) -> i32 {
        let total: i64 = nums.iter().map(|&v| v as i64).sum();
        let n = nums.len();
        let k = target as i64 / total;
        let rem = target as i64 % total;
        if rem == 0 {
            return (k * n as i64) as i32;
        }
        let mut first: HashMap<i64, i32> = HashMap::new();
        first.insert(0, -1);
        let mut pre = 0_i64;
        let mut best = -1_i32;
        for i in 0..2 * n {
            pre += nums[i % n] as i64;
            if let Some(&j) = first.get(&(pre - rem)) {
                let length = i as i32 - j;
                if best < 0 || length < best {
                    best = length;
                }
            }
            first.entry(pre).or_insert(i as i32);
        }
        if best < 0 {
            -1
        } else {
            (k * n as i64 + best as i64) as i32
        }
    }
}
