impl Solution {
    // Every value is non-negative, so an optimal selection can be found
    // among each row's top limits[i] values: pool those candidates, sort
    // descending, and sum the first k. The sum may reach
    // 250000 * 10^5 = 2.5e10, so accumulate in an i64.
    pub fn max_sum(grid: Vec<Vec<i32>>, limits: Vec<i32>, k: i32) -> i64 {
        let mut pool: Vec<i64> = Vec::new();
        for (i, row) in grid.iter().enumerate() {
            let mut s: Vec<i64> = row.iter().map(|&v| v as i64).collect();
            s.sort_unstable();
            let cap = limits[i] as usize;
            for j in s.len().saturating_sub(cap)..s.len() {
                pool.push(s[j]);
            }
        }
        pool.sort_unstable_by(|a, b| b.cmp(a));
        let take = (k as usize).min(pool.len());
        pool[..take].iter().sum()
    }
}
