const V: usize = 128; // nums[i] < 2^7, OR values stay below 128

impl Solution {
    pub fn max_value(nums: Vec<i32>, k: i32) -> i32 {
        let n = nums.len();
        let k = k as usize;

        // pre[j] = ORs of exactly k elements from first j elements
        let mut pre: Vec<[bool; V]> = vec![[false; V]; n + 1];
        {
            let mut dp: Vec<[bool; V]> = vec![[false; V]; k + 1];
            dp[0][0] = true;
            for i in 0..n {
                let x = nums[i] as usize;
                let top = (i + 1).min(k);
                for c in (1..=top).rev() {
                    for m in 0..V {
                        if dp[c - 1][m] {
                            dp[c][m | x] = true;
                        }
                    }
                }
                pre[i + 1] = dp[k];
            }
        }

        // suf[i] = ORs of exactly k elements from nums[i:]
        let mut suf: Vec<[bool; V]> = vec![[false; V]; n + 1];
        {
            let mut dp: Vec<[bool; V]> = vec![[false; V]; k + 1];
            dp[0][0] = true;
            for i in (0..n).rev() {
                let x = nums[i] as usize;
                let top = (n - i).min(k);
                for c in (1..=top).rev() {
                    for m in 0..V {
                        if dp[c - 1][m] {
                            dp[c][m | x] = true;
                        }
                    }
                }
                suf[i] = dp[k];
            }
        }

        let mut ans: i32 = 0;
        for i in k..=n - k {
            for a in 0..V {
                if !pre[i][a] {
                    continue;
                }
                for b in 0..V {
                    if suf[i][b] {
                        let v = (a ^ b) as i32;
                        if v > ans {
                            ans = v;
                        }
                    }
                }
            }
        }
        ans
    }
}
