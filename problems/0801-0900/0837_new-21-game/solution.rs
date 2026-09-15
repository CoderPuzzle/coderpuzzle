impl Solution {
    pub fn new21_game(n: i32, k: i32, max_pts: i32) -> f64 {
        let (n, k, max_pts) = (n as i64, k as i64, max_pts as i64);
        if k == 0 || n >= k - 1 + max_pts {
            return 1.0;
        }
        // dp[i] = probability of ever holding exactly i points.
        let mut dp = vec![0.0f64; (n + 1) as usize];
        dp[0] = 1.0;
        let mut window = 1.0f64; // sum of dp[max(0, i - maxPts) .. i - 1]
        for i in 1..=n {
            dp[i as usize] = window / max_pts as f64;
            if i < k {
                window += dp[i as usize];
            }
            if i - max_pts >= 0 {
                window -= dp[(i - max_pts) as usize];
            }
        }
        // Compensated (Neumaier) summation, matching the reference's built-in sum().
        let mut result = 0.0f64;
        let mut c = 0.0f64;
        for i in k..=n {
            let x = dp[i as usize];
            let t = result + x;
            if result.abs() >= x.abs() {
                c += (result - t) + x;
            } else {
                c += (x - t) + result;
            }
            result = t;
        }
        result + c
    }
}
