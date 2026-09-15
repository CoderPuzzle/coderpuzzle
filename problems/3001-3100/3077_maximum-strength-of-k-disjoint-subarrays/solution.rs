impl Solution {
    pub fn maximum_strength(nums: Vec<i32>, k: i32) -> i64 {
        let neg = i64::MIN / 4;
        let n = nums.len();
        let k = k as usize;
        // nxt[j][x] = dp[i+1][j][x]
        let mut nxt = vec![[neg, neg]; k + 1];
        nxt[0][0] = 0;
        for i in (0..n).rev() {
            let mut cur = vec![[neg, neg]; k + 1];
            for j in 0..=k {
                if j >= 1 {
                    let coeff: i64 = if (j & 1) != 0 { j as i64 } else { -(j as i64) };
                    let mut best = nxt[j - 1][0];
                    if nxt[j][1] > best {
                        best = nxt[j][1];
                    }
                    cur[j][1] = nums[i] as i64 * coeff + best;
                }
                cur[j][0] = nxt[j][0];
                if cur[j][1] > cur[j][0] {
                    cur[j][0] = cur[j][1];
                }
            }
            nxt = cur;
        }
        nxt[k][0]
    }
}
