use std::collections::HashMap;

impl Solution {
    pub fn max_score(grid: Vec<Vec<i32>>) -> i32 {
        let n = grid.len();
        // value -> bitmask of rows containing that value
        let mut value_rows: HashMap<i32, u32> = HashMap::new();
        for (r, row) in grid.iter().enumerate() {
            for &c in row {
                *value_rows.entry(c).or_insert(0) |= 1u32 << r;
            }
        }
        let mut values: Vec<i32> = value_rows.keys().copied().collect();
        values.sort_unstable_by(|a, b| b.cmp(a));
        let full = 1usize << n;
        let mut dp = vec![-1i32; full];
        let mut ndp = vec![-1i32; full];
        dp[0] = 0;
        for &value in &values {
            let rows = value_rows[&value];
            ndp.copy_from_slice(&dp);
            for mask in 0..full {
                let cur = dp[mask];
                if cur < 0 {
                    continue;
                }
                let mut rem = rows & !(mask as u32);
                while rem != 0 {
                    let bit = rem & rem.wrapping_neg();
                    let nmask = mask | bit as usize;
                    let cand = cur + value;
                    if cand > ndp[nmask] {
                        ndp[nmask] = cand;
                    }
                    rem &= rem - 1;
                }
            }
            std::mem::swap(&mut dp, &mut ndp);
        }
        let mut ans = 0;
        for &v in &dp {
            if v > ans {
                ans = v;
            }
        }
        ans
    }
}
