use std::collections::HashMap;

impl Solution {
    pub fn beautiful_subsets(mut nums: Vec<i32>, k: i32) -> i32 {
        // Sort, then decide each element take-or-skip in index order.
        // Taking nums[i] is legal exactly when no earlier-taken value
        // equals nums[i] - k — the only conflict a sorted order can
        // create; a counter map tracks how often each taken value
        // occurs (duplicates never clash with each other since k >= 1).
        // Every take/skip leaf is one subset selection; drop the empty
        // one at the end. The answer is at most 2^18 - 1 = 262143.
        nums.sort_unstable();
        fn count(nums: &[i32], k: i32, taken: &mut HashMap<i32, i32>, i: usize) -> i32 {
            if i == nums.len() {
                return 1;
            }
            let mut total = count(nums, k, taken, i + 1);
            let clash = taken.get(&(nums[i] - k)).copied().unwrap_or(0);
            if clash == 0 {
                *taken.entry(nums[i]).or_insert(0) += 1;
                total += count(nums, k, taken, i + 1);
                let entry = taken.entry(nums[i]).or_insert(0);
                *entry -= 1;
                if *entry == 0 {
                    taken.remove(&nums[i]);
                }
            }
            total
        }
        count(&nums, k, &mut HashMap::new(), 0) - 1
    }
}
