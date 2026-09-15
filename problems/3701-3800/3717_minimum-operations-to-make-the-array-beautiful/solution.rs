impl Solution {
    pub fn min_operations(nums: Vec<i32>) -> i32 {
        // Only increments exist and index 0 never moves, so a finished array
        // is a nondecreasing divisibility chain anchored at nums[0]. No
        // optimal chain runs above 2600: past max(nums) the chain could be
        // held flat for free (equal still divides), so only the last element
        // may sit higher, and its cheapest fix stays under predecessor + 50.
        let limit = 2600usize;
        // Divisor lists of every final value, self inclusive -- holding the
        // previous height must remain a legal move.
        let mut divisors: Vec<Vec<usize>> = vec![Vec::new(); limit + 1];
        for u in 1..=limit {
            let mut m = u;
            while m <= limit {
                divisors[m].push(u);
                m += u;
            }
        }
        let inf = i32::MAX;
        // dp[v]: cheapest way to make the processed prefix beautiful with the
        // last position holding exactly v.
        let mut dp = vec![inf; limit + 1];
        dp[nums[0] as usize] = 0;
        for i in 1..nums.len() {
            let need = nums[i] as usize;
            let mut ndp = vec![inf; limit + 1];
            for v in need..=limit {
                let mut best = inf;
                for &u in &divisors[v] {
                    if dp[u] < best {
                        best = dp[u];
                    }
                }
                if best != inf {
                    ndp[v] = best + (v - need) as i32;
                }
            }
            dp = ndp;
        }
        *dp.iter().min().unwrap()
    }
}
