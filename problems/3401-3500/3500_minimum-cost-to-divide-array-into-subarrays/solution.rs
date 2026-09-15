impl Solution {
    pub fn minimum_cost(nums: Vec<i32>, cost: Vec<i32>, k: i32) -> i64 {
        let n = nums.len();
        let mut pref_nums = vec![0i64; n + 1];
        let mut pref_cost = vec![0i64; n + 1];
        for i in 0..n {
            pref_nums[i + 1] = pref_nums[i] + nums[i] as i64;
            pref_cost[i + 1] = pref_cost[i] + cost[i] as i64;
        }

        let inf = 1i64 << 62;
        // dp[i] = min cost to partition the suffix nums[i:]; empty suffix is free.
        let mut dp = vec![inf; n + 1];
        dp[n] = 0;
        let total_cost = pref_cost[n];
        // Right-to-left so every suffix value dp[j+1] is ready when needed.
        let mut i = n as i64 - 1;
        while i >= 0 {
            let iu = i as usize;
            let mut best = inf;
            // Take [iu, j] as the first block. The k*index term telescopes: each
            // block is charged k * (cost mass from iu to the array's end), a
            // self-contained penalty independent of later split choices.
            for j in iu..n {
                // pref_nums[j+1] is the whole-array prefix through j, matching the
                // nums[0..r] factor of the formula, not the block's own sum.
                let mut seg = pref_nums[j + 1] * (pref_cost[j + 1] - pref_cost[iu]);
                seg += (k as i64) * (total_cost - pref_cost[iu]);
                let cand = seg + dp[j + 1];
                if cand < best {
                    best = cand;
                }
            }
            dp[iu] = best;
            i -= 1;
        }
        dp[0]
    }
}
