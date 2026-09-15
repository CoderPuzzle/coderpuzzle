use std::collections::HashMap;

impl Solution {
    pub fn maximum_strong_pair_xor(nums: Vec<i32>) -> i32 {
        // Sorting makes the kindred condition one-sided: a partner y of the
        // larger member x must satisfy x <= 2*y, so each x's partners are a
        // window over the earlier sorted values that two pointers maintain.
        let mut nums = nums;
        nums.sort();
        // counts[level] maps a window value's first (level + 1) bits to how
        // many window values carry that prefix; every value is below 128,
        // so seven bits cover them all, and a value leaving the window just
        // decrements its counts instead of invalidating shared prefixes.
        let mut counts: Vec<HashMap<i32, i32>> = vec![HashMap::new(); 7];
        let mut lo = 0usize;
        let mut best = 0;
        for i in 0..nums.len() {
            let x = nums[i];
            while 2 * nums[lo] < x {
                let y = nums[lo];
                let mut prefix = 0;
                for level in 0..7 {
                    prefix = prefix * 2 + ((y >> (6 - level)) & 1);
                    let slot = counts[level].entry(prefix).or_insert(0);
                    *slot -= 1;
                    if *slot == 0 {
                        counts[level].remove(&prefix);
                    }
                }
                lo += 1;
            }
            // Greedy walk over x's bits, high to low: keep a bit exactly
            // when the partner prefix that completes it is itself in the
            // window.
            let mut prefix = 0;
            let mut ans = 0;
            for level in 0..7 {
                prefix = prefix * 2 + ((x >> (6 - level)) & 1);
                ans = if counts[level].contains_key(&(prefix ^ (ans * 2 + 1))) {
                    ans * 2 + 1
                } else {
                    ans * 2
                };
            }
            best = best.max(ans);
            // Admit x for the larger values still to come.
            prefix = 0;
            for level in 0..7 {
                prefix = prefix * 2 + ((x >> (6 - level)) & 1);
                *counts[level].entry(prefix).or_insert(0) += 1;
            }
        }
        best
    }
}
