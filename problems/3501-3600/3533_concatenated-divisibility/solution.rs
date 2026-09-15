impl Solution {
    pub fn concatenated_divisibility(nums: Vec<i32>, k: i32) -> Vec<i32> {
        let n = nums.len();
        let k = k as usize;
        let lens: Vec<usize> = nums.iter().map(|x| x.to_string().len()).collect();
        let mut pow10 = [1i64; 8];
        for i in 1..8 {
            pow10[i] = pow10[i - 1] * 10;
        }

        let full = (1usize << n) - 1;
        // dp[mask][rem]: after using `mask` with prefix remainder rem, can the
        // unused numbers finish the concatenation divisible by k?
        let mut dp = vec![vec![false; k]; 1usize << n];
        // anchor: everything used and remainder 0 is already a valid finish
        dp[full][0] = true;
        // fill masks in decreasing order so transitions read more-used masks
        for mask in (0..full).rev() {
            for rem in 0..k {
                for i in 0..n {
                    if (mask >> i) & 1 == 0 {
                        // appending nums[i] shifts rem to (rem*10^len + x) mod k
                        let nrem = ((rem as i64 * pow10[lens[i]] + nums[i] as i64) % k as i64) as usize;
                        if dp[mask | (1 << i)][nrem] {
                            dp[mask][rem] = true;
                            break;
                        }
                    }
                }
            }
        }

        if !dp[0][0] {
            return Vec::new();
        }

        // reconstruction: greedily take the smallest unused number that keeps
        // the state completable — safe because the DP marks exactly those
        let mut order: Vec<usize> = (0..n).collect();
        order.sort_by(|&a, &b| nums[a].cmp(&nums[b]).then(a.cmp(&b)));
        let mut res: Vec<i32> = Vec::new();
        let mut mask = 0usize;
        let mut rem = 0usize;
        for _ in 0..n {
            for &i in &order {
                if (mask >> i) & 1 == 0 {
                    let nrem = ((rem as i64 * pow10[lens[i]] + nums[i] as i64) % k as i64) as usize;
                    if dp[mask | (1 << i)][nrem] {
                        res.push(nums[i]);
                        mask |= 1 << i;
                        rem = nrem;
                        break;
                    }
                }
            }
        }
        res
    }
}
