use std::collections::HashMap;

impl Solution {
    pub fn min_removals(nums: Vec<i32>, target: i32) -> i32 {
        // dp[xor] = maximum number of elements we can KEEP with XOR == xor
        let mut dp: HashMap<i32, i32> = HashMap::new();
        dp.insert(0, 0);
        for &x in &nums {
            let snapshot: Vec<(i32, i32)> = dp.iter().map(|(&k, &v)| (k, v)).collect();
            for (xor_val, count) in snapshot {
                let nx = xor_val ^ x;
                let cand = count + 1;
                if cand > *dp.get(&nx).unwrap_or(&-1) {
                    dp.insert(nx, cand);
                }
            }
        }
        match dp.get(&target) {
            Some(&best) => nums.len() as i32 - best,
            None => -1,
        }
    }
}
