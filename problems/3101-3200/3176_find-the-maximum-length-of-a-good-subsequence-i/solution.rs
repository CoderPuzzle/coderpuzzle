use std::collections::HashMap;

impl Solution {
    pub fn maximum_length(nums: Vec<i32>, k: i32) -> i32 {
        // One row per change budget: row[v][a] is the longest good
        // subsequence using exactly a changes and ending on value v;
        // ends_all[a] mirrors the best over all endings. Same-valued
        // tails extend for free, everything else spends one budget
        // step, and both reads use stats frozen before this element.
        let k = k as usize;
        let mut ends: HashMap<i32, Vec<i32>> = HashMap::new();
        let mut ends_all = vec![0i32; k + 1];
        let mut best = 0;
        for &x in &nums {
            let mut row = ends.remove(&x).unwrap_or_else(|| vec![0; k + 1]);
            let mut computed = vec![0i32; k + 1];
            for a in 0..=k {
                let prior = if a == 0 { 0 } else { ends_all[a - 1] };
                computed[a] = row[a].max(prior) + 1;
            }
            for a in 0..=k {
                if computed[a] > row[a] {
                    row[a] = computed[a];
                }
                if computed[a] > ends_all[a] {
                    ends_all[a] = computed[a];
                }
                best = best.max(ends_all[a]);
            }
            ends.insert(x, row);
        }
        best
    }
}
