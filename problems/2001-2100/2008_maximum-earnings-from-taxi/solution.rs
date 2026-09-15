impl Solution {
    pub fn max_taxi_earnings(n: i32, rides: Vec<Vec<i32>>) -> i64 {
        let n = n as usize;
        let mut ending: Vec<Vec<(usize, i64)>> = vec![Vec::new(); n + 1];
        for ride in rides {
            let start = ride[0] as usize;
            let end = ride[1] as usize;
            let profit = (ride[1] - ride[0] + ride[2]) as i64;
            ending[end].push((start, profit));
        }

        let mut dp = vec![0_i64; n + 1];
        for point in 1..=n {
            dp[point] = dp[point - 1];
            for &(start, profit) in &ending[point] {
                dp[point] = dp[point].max(dp[start] + profit);
            }
        }
        dp[n]
    }
}
