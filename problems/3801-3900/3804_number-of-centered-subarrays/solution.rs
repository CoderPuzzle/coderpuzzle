use std::collections::HashMap;

impl Solution {
    // Totals stay within 500 * 10^5 = 5 * 10^7 and the count within
    // 125,250, so i32 arithmetic carries both without overflow.
    pub fn centered_subarrays(nums: Vec<i32>) -> i32 {
        let n = nums.len();
        let mut count = 0i32;
        // Anchor the left end and grow the right, carrying the window sum
        // and a counter of the values currently inside the window. The
        // window [i..j] is centered exactly when its running total is one
        // of the values the counter holds.
        for i in 0..n {
            let mut window: HashMap<i32, i32> = HashMap::new();
            let mut total = 0i32;
            for j in i..n {
                total += nums[j];
                *window.entry(nums[j]).or_insert(0) += 1;
                if window.get(&total).copied().unwrap_or(0) > 0 {
                    count += 1;
                }
            }
        }
        count
    }
}
