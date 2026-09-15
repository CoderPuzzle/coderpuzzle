use std::collections::HashSet;

impl Solution {
    pub fn longest_balanced(nums: Vec<i32>) -> i32 {
        let n = nums.len();
        let mut best = 0i32;
        // Fix the left endpoint and stretch the right one; the two sets hold
        // the distinct even and odd values of the current window, so equal
        // sizes mean the window is balanced.
        for left in 0..n {
            let mut evens: HashSet<i32> = HashSet::new();
            let mut odds: HashSet<i32> = HashSet::new();
            for right in left..n {
                if nums[right] % 2 == 0 {
                    evens.insert(nums[right]);
                } else {
                    odds.insert(nums[right]);
                }
                if evens.len() == odds.len() {
                    best = best.max((right - left + 1) as i32);
                }
            }
        }
        // No window ever balanced leaves best at 0.
        best
    }
}
