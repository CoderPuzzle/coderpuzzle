impl Solution {
    pub fn maximum_processable_queries(nums: Vec<i32>, queries: Vec<i32>) -> i32 {
        let n = nums.len();
        let m = queries.len();
        // dp[l][r]: most queries processable while nums[l..r] all survive. The
        // window starts as the whole array and shrinks one index per step; a
        // leaving end either serves the next query in order or was dropped
        // silently by the once-only subsequence op.
        let mut dp = vec![vec![0_i32; n + 1]; n + 1];
        let mut best = 0_i32;
        for span in (0..n).rev() {
            for l in 0..=(n - span) {
                let r = l + span;
                let mut t = 0_i32;
                if l > 0 {
                    let p = dp[l - 1][r];
                    t = t.max(p);
                    if p < m as i32 && nums[l - 1] >= queries[p as usize] {
                        t = t.max(p + 1);
                    }
                }
                if r < n {
                    let p = dp[l][r + 1];
                    t = t.max(p);
                    if p < m as i32 && nums[r] >= queries[p as usize] {
                        t = t.max(p + 1);
                    }
                }
                dp[l][r] = t;
                // Every survivor block can be op-deleted too, so empty
                // windows carry the answer.
                if span == 0 {
                    best = best.max(t);
                }
            }
        }
        best
    }
}
