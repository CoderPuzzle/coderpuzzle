use std::collections::HashMap;

impl Solution {
    pub fn min_length(nums: Vec<i32>, k: i32) -> i32 {
        // One pass, right end expanding: freq counts each value inside the
        // window and distinct_sum tracks the sum of the distinct values
        // present — a value joins the sum when its first copy enters and
        // leaves it when its last copy departs.
        let mut freq: HashMap<i32, i32> = HashMap::new();
        let mut distinct_sum: i64 = 0;
        let mut best: i64 = -1;
        let mut left = 0usize;
        for right in 0..nums.len() {
            let count = freq.entry(nums[right]).and_modify(|c| *c += 1).or_insert(1);
            if *count == 1 {
                distinct_sum += nums[right] as i64;
            }
            // Shrink from the left while the window stays qualified; every
            // prefix of a kept window is dropped only after recording it.
            while distinct_sum >= k as i64 && left <= right {
                let length = (right - left + 1) as i64;
                if best == -1 || length < best {
                    best = length;
                }
                let out = nums[left];
                let count = freq.get_mut(&out).unwrap();
                if *count == 1 {
                    distinct_sum -= out as i64;
                }
                *count -= 1;
                left += 1;
            }
        }
        best as i32
    }
}
