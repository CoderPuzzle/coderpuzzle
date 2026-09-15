impl Solution {
    pub fn mincost_tickets(days: Vec<i32>, costs: Vec<i32>) -> i32 {
        let durations = [1i32, 7, 30];
        let last = *days.last().unwrap();
        let mut travel = vec![false; last as usize + 1];
        for &d in &days {
            travel[d as usize] = true;
        }
        // dp[d]: cheapest coverage of every travel day up to d.
        let mut dp = vec![0i64; last as usize + 31];
        for day in 1..=last as usize {
            if !travel[day] {
                // No decision on non-travel days; the cost carries forward.
                dp[day] = dp[day - 1];
            } else {
                // A pass of duration u ending today covers (day - u, day];
                // clamping at 0 treats dp[0] = 0 as "nothing before day 1".
                let mut best = i64::MAX;
                for (i, &dur) in durations.iter().enumerate() {
                    let prev = (day as i32 - dur).max(0) as usize;
                    best = best.min(dp[prev] + costs[i] as i64);
                }
                dp[day] = best;
            }
        }
        dp[last as usize] as i32
    }
}
