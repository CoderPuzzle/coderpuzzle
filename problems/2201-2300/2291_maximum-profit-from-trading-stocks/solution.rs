impl Solution {
    pub fn maximum_profit(present: Vec<i32>, future: Vec<i32>, budget: i32) -> i32 {
        let mut dp = vec![0_i32; (budget + 1) as usize];
        for i in 0..present.len() {
            let price = present[i] as usize;
            let gain = future[i] - present[i];
            if gain <= 0 {
                continue;
            }
            for money in (price..=budget as usize).rev() {
                dp[money] = dp[money].max(dp[money - price] + gain);
            }
        }
        dp[budget as usize]
    }
}
