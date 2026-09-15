impl Solution {
    pub fn max_jumps(arr: Vec<i32>, d: i32) -> i32 {
        // Process indices in increasing height order: every one-jump target
        // is strictly lower, so its dp value is already final when needed.
        let n = arr.len();
        let mut order: Vec<usize> = (0..n).collect();
        order.sort_by_key(|i| arr[*i]);
        let mut dp = vec![1i32; n];
        for i in order {
            let mut j = i + 1;
            while j < n && (j - i) as i32 <= d && arr[j] < arr[i] {
                dp[i] = dp[i].max(1 + dp[j]);
                j += 1;
            }
            let mut j = i as i64 - 1;
            while j >= 0 && (i as i64 - j) as i32 <= d && arr[j as usize] < arr[i] {
                dp[i] = dp[i].max(1 + dp[j as usize]);
                j -= 1;
            }
        }
        *dp.iter().max().unwrap()
    }
}
