impl Solution {
    // E[x][d]: longest subsequence over processed prefixes ending with
    // value x, whose last adjacent difference is >= d (suffix max over d).
    pub fn longest_subsequence(nums: Vec<i32>) -> i32 {
        let max_v = 300usize;
        let mut e = vec![vec![0i32; max_v]; max_v + 1];
        let mut ans = 1;
        for &v in &nums {
            let v = v as usize;
            // Exact-difference lengths ending here: a predecessor with new
            // difference d must sit at value v-d or v+d, and its own last
            // difference must be >= d — exactly what E[..][d] stores.
            let mut lens = vec![0i32; max_v];
            for d in 0..max_v {
                let mut cand = 0;
                if v >= d + 1 {
                    cand = cand.max(e[v - d][d]);
                }
                if v + d <= max_v {
                    cand = cand.max(e[v + d][d]);
                }
                lens[d] = cand + 1;
            }
            // Merge the suffix max of those lengths back into row v; lens
            // entries are already >= 1, covering the singleton [v].
            let row = &mut e[v];
            let mut run = 0;
            for d in (0..max_v).rev() {
                run = run.max(lens[d]);
                row[d] = row[d].max(run);
            }
            ans = ans.max(row[0]);
        }
        ans
    }
}
