impl Solution {
    pub fn max_tastiness(price: Vec<i32>, tastiness: Vec<i32>, maxAmount: i32, maxCoupons: i32) -> i32 {
        // dp[a][c] = best tastiness having spent `a` and used `c` coupons.
        // Descending both axes keeps each fruit usable at most once: every
        // update lands at a larger amount or a larger coupon count, which
        // the descending sweep has already passed.
        let mut dp = vec![vec![-1; (maxCoupons + 1) as usize]; (maxAmount + 1) as usize];
        dp[0][0] = 0;
        for i in 0..price.len() {
            let p = price[i] as usize;
            let t = tastiness[i];
            let half = p / 2;
            for a in (0..=(maxAmount as usize)).rev() {
                for c in (0..=(maxCoupons as usize)).rev() {
                    let cur = dp[a][c];
                    if cur < 0 {
                        continue;
                    }
                    if a + p <= maxAmount as usize {
                        dp[a + p][c] = dp[a + p][c].max(cur + t);
                    }
                    if c + 1 <= maxCoupons as usize && a + half <= maxAmount as usize {
                        dp[a + half][c + 1] = dp[a + half][c + 1].max(cur + t);
                    }
                }
            }
        }
        dp.iter().flatten().copied().max().unwrap()
    }
}
