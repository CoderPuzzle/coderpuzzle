impl Solution {
    pub fn smallest_balanced_index(nums: Vec<i32>) -> i32 {
        // Suffix products saturate at total + 1: any product above the
        // total sum can never equal a prefix sum, so the sentinel value
        // compares correctly while staying inside an i64.
        let n = nums.len();
        let total: i64 = nums.iter().map(|&v| v as i64).sum();
        let cap = total + 1;
        let mut suffix = vec![1i64; n + 1];
        let mut prod: i64 = 1;
        for i in (0..n).rev() {
            if prod > cap / nums[i] as i64 {
                prod = cap;
            } else {
                prod *= nums[i] as i64;
            }
            suffix[i] = prod;
        }
        let mut left: i64 = 0;
        for i in 0..n {
            if left == suffix[i + 1] {
                return i as i32;
            }
            left += nums[i] as i64;
        }
        -1
    }
}
