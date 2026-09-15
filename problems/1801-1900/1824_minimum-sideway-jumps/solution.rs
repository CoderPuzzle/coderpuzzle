impl Solution {
    // dp[lane] = fewest side jumps needed to stand on that lane at the
    // point being processed. Forward moves are free, a lane change is one
    // jump, so each new point relaxes every open lane against the previous
    // point's cheapest lane plus one.
    pub fn min_side_jumps(obstacles: Vec<i32>) -> i32 {
        const INF: i32 = 1_000_000_000;
        let mut dp = [INF, 1, 0, 1]; // lanes indexed 1..3; start on lane 2
        for &blocked in obstacles.iter().skip(1) {
            let blocked = blocked as usize;
            dp[blocked] = INF;
            let best = dp[1].min(dp[2]).min(dp[3]);
            for lane in 1..=3 {
                if lane != blocked {
                    dp[lane] = dp[lane].min(best + 1);
                }
            }
        }
        dp[1].min(dp[2]).min(dp[3])
    }
}
