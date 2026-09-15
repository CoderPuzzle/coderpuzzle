impl Solution {
    pub fn constrained_subset_sum(nums: Vec<i32>, k: i32) -> i32 {
        let n = nums.len();
        let k = k as i64;
        let mut dp = vec![0i64; n];
        let mut dq: Vec<usize> = Vec::with_capacity(n);
        let mut head = 0usize;
        let mut best = i64::MIN;
        for i in 0..n {
            while head < dq.len() && (dq[head] as i64) < i as i64 - k {
                head += 1;
            }
            let mut prev = if head < dq.len() { dp[dq[head]] } else { 0 };
            if prev < 0 {
                prev = 0;
            }
            dp[i] = nums[i] as i64 + prev;
            while head < dq.len() && dp[*dq.last().unwrap()] <= dp[i] {
                dq.pop();
            }
            dq.push(i);
            if dp[i] > best {
                best = dp[i];
            }
        }
        best as i32
    }
}
