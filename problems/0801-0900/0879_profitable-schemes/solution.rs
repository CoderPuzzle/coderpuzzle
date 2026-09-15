impl Solution {
    pub fn profitable_schemes(n: i32, minProfit: i32, group: Vec<i32>, profit: Vec<i32>) -> i32 {
        const MOD: i64 = 1_000_000_007;
        let n = n as usize;
        let min_profit = minProfit as usize;
        // dp[members][cap] = number of subsets using at most `members` members
        // and at least `cap` profit; cap is capped at minProfit.
        let mut dp = vec![vec![0i64; min_profit + 1]; n + 1];
        for members in 0..=n {
            dp[members][0] = 1;
        }
        for idx in 0..group.len() {
            let g = group[idx] as usize;
            let p = profit[idx] as usize;
            let mut members = n;
            while members >= g {
                let mut cap = min_profit;
                loop {
                    let prev = if cap > p { cap - p } else { 0 };
                    dp[members][cap] = (dp[members][cap] + dp[members - g][prev]) % MOD;
                    if cap == 0 {
                        break;
                    }
                    cap -= 1;
                }
                if members == 0 {
                    break;
                }
                members -= 1;
            }
        }
        dp[n][min_profit] as i32
    }
}
