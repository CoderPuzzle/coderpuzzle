impl Solution {
    pub fn largest_number(cost: Vec<i32>, target: i32) -> String {
        let target = target as usize;
        let mut dp = vec![-1i32; target + 1];
        dp[0] = 0;
        for t in 1..=target {
            for &c in &cost {
                let c = c as usize;
                if c <= t && dp[t - c] != -1 && dp[t - c] + 1 > dp[t] {
                    dp[t] = dp[t - c] + 1;
                }
            }
        }
        if dp[target] == -1 {
            return String::from("0");
        }
        let mut result = Vec::with_capacity(dp[target] as usize);
        let mut remaining = target;
        while remaining > 0 {
            for digit in (1..=9).rev() {
                let c = cost[digit - 1] as usize;
                if c <= remaining && dp[remaining - c] == dp[remaining] - 1 {
                    result.push(b'0' + digit as u8);
                    remaining -= c;
                    break;
                }
            }
        }
        String::from_utf8(result).unwrap()
    }
}
