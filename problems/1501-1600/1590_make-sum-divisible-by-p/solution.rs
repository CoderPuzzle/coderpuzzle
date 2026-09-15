use std::collections::HashMap;

impl Solution {
    pub fn min_subarray(nums: Vec<i32>, p: i32) -> i32 {
        let n = nums.len() as i32;
        // values reach 1e9 and the array reaches length 1e5, so the total
        // can reach 1e14 — accumulate in i64 before taking the mod.
        let total: i64 = nums.iter().map(|&v| v as i64).sum();
        let target = (total % p as i64) as i32;
        if target == 0 {
            return 0;
        }

        // Map each running prefix remainder to its most recent index,
        // seeded with the empty prefix (remainder 0 at index -1).
        let mut last_index: HashMap<i32, i32> = HashMap::from([(0, -1)]);
        let mut running: i64 = 0;
        let mut best = n;
        for (index, &value) in nums.iter().enumerate() {
            running = (running + value as i64) % p as i64;
            let needed = (((running - target as i64) % p as i64 + p as i64) % p as i64) as i32;
            if let Some(&earlier) = last_index.get(&needed) {
                // A match spanning the full array (earlier == -1 at the
                // last index) would remove everything, which is
                // disallowed — cap the span below n to reject exactly
                // that one case.
                let span = index as i32 - earlier;
                if span < n && span < best {
                    best = span;
                }
            }
            last_index.insert(running as i32, index as i32);
        }

        if best < n {
            best
        } else {
            -1
        }
    }
}
