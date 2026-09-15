impl Solution {
    // Stream queries once; per index keep subset-sum reachability of the
    // vals seen so far (0/1 knapsack, one item per query) as a boolean
    // table, and stop updating an index once its target is reachable.
    pub fn min_zero_array(nums: Vec<i32>, queries: Vec<Vec<i32>>) -> i32 {
        let n = nums.len();
        let mut reach: Vec<Vec<u8>> = vec![Vec::new(); n];
        let mut done = vec![false; n];
        let mut remaining = 0usize;
        for i in 0..n {
            let t = nums[i] as usize;
            if t == 0 {
                done[i] = true;
            } else {
                reach[i] = vec![0u8; t + 1];
                reach[i][0] = 1;
                remaining += 1;
            }
        }
        if remaining == 0 {
            return 0;
        }
        for (k, q) in queries.iter().enumerate() {
            let (l, r, val) = (q[0] as usize, q[1] as usize, q[2] as usize);
            for i in l..=r {
                if done[i] || val > nums[i] as usize {
                    continue;
                }
                let t = nums[i] as usize;
                let row = &mut reach[i];
                for s in (0..=t - val).rev() {
                    if row[s] == 1 {
                        row[s + val] = 1;
                    }
                }
                if row[t] == 1 {
                    done[i] = true;
                    remaining -= 1;
                }
            }
            if remaining == 0 {
                return (k + 1) as i32;
            }
        }
        -1
    }
}
