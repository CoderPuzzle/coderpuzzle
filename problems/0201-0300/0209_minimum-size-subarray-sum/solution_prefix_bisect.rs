impl Solution {
    pub fn min_sub_array_len(target: i32, nums: Vec<i32>) -> i32 {
        let n = nums.len();
        // prefix[i] = sum of the first i elements. Positivity makes it
        // strictly increasing, which licenses the binary search; i64s
        // absorb prefix + target, which can pass 2^31.
        let mut prefix: Vec<i64> = vec![0; n + 1];
        for i in 0..n {
            prefix[i + 1] = prefix[i] + nums[i] as i64;
        }
        // Sentinel: an impossible length that survives when target is never met.
        let mut best = n + 1;
        for i in 0..n {
            let key = prefix[i] + target as i64;
            // partition_point: the first prefix >= key. The array is sorted,
            // so the hit lands at or after i+1 and the window is non-empty.
            let j = prefix.partition_point(|&p| p < key);
            if j <= n {
                best = best.min(j - i);
            }
        }
        if best == n + 1 {
            0
        } else {
            best as i32
        }
    }
}
