use std::collections::HashMap;

impl Solution {
    pub fn can_partition_k_subsets(nums: Vec<i32>, k: i32) -> bool {
        let total: i64 = nums.iter().map(|&v| v as i64).sum();
        if total % k as i64 != 0 {
            return false;
        }
        let target = (total / k as i64) as i32;
        let mut nums = nums;
        // Largest elements are hardest to place; descending order prunes early.
        nums.sort_by(|a, b| b.cmp(a));
        if nums[0] > target {
            return false;
        }
        let full: u32 = (1u32 << nums.len()) - 1;
        let mut memo: HashMap<(u32, i32), bool> = HashMap::new();
        // State: bitmask of placed elements plus curr, the partial sum of the
        // subset currently being filled.
        fn dfs(
            nums: &[i32],
            target: i32,
            full: u32,
            mask: u32,
            curr: i32,
            memo: &mut HashMap<(u32, i32), bool>,
        ) -> bool {
            if mask == full {
                return true;
            }
            // Subset complete: start the next one from zero.
            if curr == target {
                return dfs(nums, target, full, mask, 0, memo);
            }
            if let Some(&v) = memo.get(&(mask, curr)) {
                return v;
            }
            // Try every unused element that still fits under the target.
            for i in 0..nums.len() {
                if (mask >> i) & 1 == 0 && curr + nums[i] <= target {
                    if dfs(nums, target, full, mask | (1 << i), curr + nums[i], memo) {
                        memo.insert((mask, curr), true);
                        return true;
                    }
                }
            }
            memo.insert((mask, curr), false);
            false
        }
        dfs(&nums, target, full, 0, 0, &mut memo)
    }
}
