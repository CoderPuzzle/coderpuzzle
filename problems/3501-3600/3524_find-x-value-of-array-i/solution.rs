impl Solution {
    pub fn result_array(nums: Vec<i32>, k: i32) -> Vec<i64> {
        // Removing a prefix and a suffix is the same as choosing the
        // non-empty contiguous middle that survives, so result[x] counts
        // subarrays whose product is x mod k. The running DP extends every
        // subarray ending at the previous element by nums[i] and adds the
        // singleton [i]. Counts reach 5,000,050,000 for n = 10^5 — beyond
        // i32 — and r * nums[i] reaches 4 * 10^9, so both live in i64.
        let k = k as usize;
        let mut counts = vec![0_i64; k];
        let mut result = vec![0_i64; k];
        for &num in &nums {
            let mut extended = vec![0_i64; k];
            for r in 0..k {
                if counts[r] > 0 {
                    extended[(r as i64 * num as i64 % k as i64) as usize] += counts[r];
                }
            }
            extended[(num % k as i32) as usize] += 1;
            for r in 0..k {
                result[r] += extended[r];
            }
            counts = extended;
        }
        result
    }
}
