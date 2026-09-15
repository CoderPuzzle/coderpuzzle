use std::collections::HashMap;

impl Solution {
    // Pointer + counts: counts tracks the remaining suffix, duplicated
    // how many distinct values it still holds twice or more. While the
    // suffix has a duplicate, one operation advances the pointer by three
    // and refreshes only those three values (the last, possibly shorter,
    // operation removes whatever is left).
    pub fn min_operations(nums: Vec<i32>) -> i32 {
        let n = nums.len();
        let mut counts: HashMap<i32, i32> = HashMap::new();
        for &v in &nums {
            *counts.entry(v).or_insert(0) += 1;
        }
        let mut duplicated = 0;
        for &c in counts.values() {
            if c >= 2 {
                duplicated += 1;
            }
        }
        let mut i = 0usize;
        let mut ops = 0i32;
        while i < n && duplicated > 0 {
            let end = (i + 3).min(n);
            for j in i..end {
                let c = counts.get_mut(&nums[j]).unwrap();
                *c -= 1;
                if *c == 1 {
                    duplicated -= 1;
                }
            }
            i += 3;
            ops += 1;
        }
        ops
    }
}
