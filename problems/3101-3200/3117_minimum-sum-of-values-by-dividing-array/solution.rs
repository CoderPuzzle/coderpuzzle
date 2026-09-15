impl Solution {
    pub fn minimum_value_sum(nums: Vec<i32>, and_values: Vec<i32>) -> i32 {
        // Layered DP: g[k] after j rounds = min value sum splitting nums[:k]
        // into exactly j segments matching and_values[:j]. For a fixed right
        // end r the starts l with AND(nums[l..r]) == t form ONE contiguous
        // run inside the classic AND-group list (extending r folds every
        // stored value with nums[r]; equal results merge into one range),
        // so a transition is a range-minimum over the previous layer,
        // served by a small iterative segment tree. Costs stay below
        // m * max(nums) < 10^6, well inside an i32.
        let n = nums.len();
        const INFTY: i32 = 1 << 30;

        let mut group_vals: Vec<Vec<i32>> = vec![Vec::new(); n];
        let mut group_starts: Vec<Vec<usize>> = vec![Vec::new(); n];
        let mut vals: Vec<i32> = Vec::new();
        let mut starts: Vec<usize> = Vec::new();
        for (r, &x) in nums.iter().enumerate() {
            let mut nvals = vec![x];
            let mut nstarts = vec![r];
            for i in 0..vals.len() {
                let v = vals[i] & x;
                if v != *nvals.last().unwrap() {
                    nvals.push(v);
                    nstarts.push(starts[i]);
                } else {
                    *nstarts.last_mut().unwrap() = starts[i];
                }
            }
            vals = nvals;
            starts = nstarts;
            group_vals[r] = vals.clone();
            group_starts[r] = starts.clone();
        }

        let mut prev = vec![INFTY; n + 1];
        prev[0] = 0;
        let size = n + 1;
        for target in and_values {
            let mut tree = vec![INFTY; 2 * size];
            tree[size..].copy_from_slice(&prev);
            for k in (1..size).rev() {
                tree[k] = tree[2 * k].min(tree[2 * k + 1]);
            }

            let mut cur = vec![INFTY; n + 1];
            for r in 0..n {
                let mut lo: i64 = -1;
                let mut hi: i64 = -2;
                for gi in 0..group_vals[r].len() {
                    if group_vals[r][gi] == target {
                        lo = group_starts[r][gi] as i64;
                        hi = if gi > 0 {
                            (group_starts[r][gi - 1] as i64) - 1
                        } else {
                            r as i64
                        };
                        break;
                    }
                }
                if lo < 0 {
                    continue; // this target cannot end at r
                }
                let mut best = INFTY;
                let (mut l, mut rr) = ((lo + size as i64) as usize, (hi + 1 + size as i64) as usize);
                while l < rr {
                    if l & 1 == 1 {
                        best = best.min(tree[l]);
                        l += 1;
                    }
                    if rr & 1 == 1 {
                        rr -= 1;
                        best = best.min(tree[rr]);
                    }
                    l >>= 1;
                    rr >>= 1;
                }
                if best < INFTY {
                    cur[r + 1] = best + nums[r];
                }
            }
            prev = cur;
        }

        if prev[n] < INFTY {
            prev[n]
        } else {
            -1
        }
    }
}
