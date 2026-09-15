use std::collections::HashMap;

// Sweep i from the right; freq counts occurrences of each value in
// the window [i + k + 1, n - 1], so stepping i down inserts exactly
// nums[i + k + 1] and the delayed count is a single lookup.
impl Solution {
    pub fn delayed_count(nums: Vec<i32>, k: i32) -> Vec<i32> {
        let n = nums.len();
        let mut ans = vec![0i32; n];
        let mut freq: HashMap<i32, i32> = HashMap::new();
        for i in (0..n).rev() {
            let ahead = i + k as usize + 1;
            if ahead < n {
                *freq.entry(nums[ahead]).or_insert(0) += 1;
            }
            ans[i] = freq.get(&nums[i]).copied().unwrap_or(0);
        }
        ans
    }
}
