use std::collections::HashMap;

impl Solution {
    // The condition rearranges to nums[i] - rev(nums[i]) being equal on
    // both sides, so each key pairs with every earlier equal key; the
    // running total stays under C(10^5, 2) ~ 5 * 10^9, so it is
    // accumulated in an i64 and reduced once at the end.
    pub fn count_nice_pairs(nums: Vec<i32>) -> i32 {
        let mut count: HashMap<i32, i32> = HashMap::new();
        let mut total: i64 = 0;
        for &x in &nums {
            let mut y = x;
            let mut r = 0;
            while y > 0 {
                r = r * 10 + y % 10;
                y /= 10;
            }
            let key = x - r;
            let seen = *count.get(&key).unwrap_or(&0);
            total += seen as i64;
            count.insert(key, seen + 1);
        }
        (total % 1_000_000_007) as i32
    }
}
