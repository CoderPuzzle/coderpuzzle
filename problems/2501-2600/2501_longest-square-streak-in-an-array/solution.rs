use std::collections::HashMap;

impl Solution {
    pub fn longest_square_streak(nums: Vec<i32>) -> i32 {
        // A sorted streak always steps v -> v*v, so scanning the distinct
        // values ascending makes each value extend at most one chain: the
        // one ending at its integer square root, when that root is itself
        // present. Roots stay below 317, so squaring them cannot overflow.
        let mut values = nums;
        values.sort_unstable();
        values.dedup();
        let mut length: HashMap<i32, i32> = HashMap::new();
        let mut longest = 0;
        for &value in &values {
            let root = ((value as f64).sqrt() + 0.5) as i32;
            let len = match length.get(&root) {
                Some(&prev) if root * root == value => prev + 1,
                _ => 1,
            };
            length.insert(value, len);
            longest = longest.max(len);
        }
        if longest >= 2 {
            longest
        } else {
            -1
        }
    }
}
