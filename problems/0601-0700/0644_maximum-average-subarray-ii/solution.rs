impl Solution {
    pub fn find_max_average(nums: Vec<i32>, k: i32) -> f64 {
        let n = nums.len();
        let k = k as usize;
        // prefix[i] = sum of nums[:i]
        let mut prefix = vec![0i64; n + 1];
        for i in 0..n {
            prefix[i + 1] = prefix[i] + nums[i] as i64;
        }
        // Exact comparison of averages via cross-multiplication:
        // s1/l1 > s2/l2  <=>  s1*l2 > s2*l1  (positive lengths).
        let mut best_sum: i64 = 0;
        let mut best_len: usize = 0;
        for length in k..=n {
            let mut s: i64 = i64::MIN;
            for t in 0..=(n - length) {
                let v = prefix[t + length] - prefix[t];
                if v > s {
                    s = v;
                }
            }
            if best_len == 0 || s * best_len as i64 > best_sum * length as i64 {
                best_sum = s;
                best_len = length;
            }
        }
        best_sum as f64 / best_len as f64
    }
}
