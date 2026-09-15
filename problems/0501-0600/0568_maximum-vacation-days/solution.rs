impl Solution {
    pub fn max_vacation_days(flights: Vec<Vec<i32>>, days: Vec<Vec<i32>>) -> i32 {
        let n = flights.len();
        let k = days[0].len();
        // dp[city] = best vacation total through the weeks handled so far;
        // -1 marks the cities no schedule has reached yet.
        let mut dp = vec![-1i32; n];
        // Before week 0 the traveler sits in city 0 with nothing banked, so
        // week 0's own step encodes the first Monday's flight.
        dp[0] = 0;
        for w in 0..k {
            let mut ndp = vec![-1i32; n];
            for j in 0..n {
                for i in 0..n {
                    if dp[i] < 0 {
                        continue;
                    }
                    // One decision per week: a Monday flight i -> j, or
                    // staying put (i == j) at no flight cost.
                    if i == j || flights[i][j] == 1 {
                        let total = dp[i] + days[j][w];
                        if total > ndp[j] {
                            ndp[j] = total;
                        }
                    }
                }
            }
            dp = ndp;
        }
        // Staying in a city is always allowed, so the start city keeps some
        // schedule alive every week.
        *dp.iter().max().unwrap()
    }
}
