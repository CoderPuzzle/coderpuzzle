impl Solution {
    pub fn max_score(nums: Vec<i32>) -> i32 {
        // dp[mask] is the best score once exactly the elements of mask have
        // been removed; the next operation is popcount(mask) / 2 + 1 and
        // pairs any two still-present elements. Ascending mask order works
        // because transitions only set bits, and the growing multiplier is
        // why the richest pair often belongs to the last operation, not the
        // first. Totals stay below 28 * 10^6, inside 32-bit range.
        fn gcd(a: i32, b: i32) -> i32 {
            if b == 0 {
                a
            } else {
                gcd(b, a % b)
            }
        }
        let m = nums.len();
        let mut g = vec![vec![0i32; m]; m];
        for i in 0..m {
            for j in i + 1..m {
                let d = gcd(nums[i], nums[j]);
                g[i][j] = d;
                g[j][i] = d;
            }
        }
        let size = 1usize << m;
        let mut dp = vec![0i32; size];
        for mask in 0..size {
            let k = (mask.count_ones() / 2 + 1) as i32;
            let base = dp[mask];
            for i in 0..m {
                if mask & (1 << i) != 0 {
                    continue;
                }
                for j in i + 1..m {
                    if mask & (1 << j) != 0 {
                        continue;
                    }
                    let next = mask | (1 << i) | (1 << j);
                    let cand = base + k * g[i][j];
                    if cand > dp[next] {
                        dp[next] = cand;
                    }
                }
            }
        }
        dp[size - 1]
    }
}
