impl Solution {
    pub fn min_xor(nums: Vec<i32>, k: i32) -> i32 {
        // dp over prefixes: dp[j][i] = smallest achievable "maximum part
        // XOR" splitting the first i elements into j parts. The last part
        // of an optimal split is nums[t..i-1], whose XOR is
        // pre[i] ^ pre[t], so dp[j][i] = min over t of
        // max(dp[j-1][t], pre[i] ^ pre[t]).
        // Rows roll: prev is dp[j-1], cur becomes dp[j]. Every part XOR is
        // < 2^30 (nums[i] <= 10^9), so i32 is exact throughout.
        let n = nums.len();
        let mut pre = vec![0i32; n + 1];
        for (i, value) in nums.iter().enumerate() {
            pre[i + 1] = pre[i] ^ value;
        }

        let big = i32::MAX;
        let mut prev = pre.clone(); // dp[1][i] = XOR of the whole prefix
        for j in 2..=k as usize {
            let mut cur = vec![big; n + 1];
            for i in j..=n {
                let pi = pre[i];
                let mut best = big;
                for t in (j - 1)..i {
                    let candidate = prev[t].max(pi ^ pre[t]);
                    if candidate < best {
                        best = candidate;
                    }
                }
                cur[i] = best;
            }
            prev = cur;
        }
        prev[n]
    }
}
