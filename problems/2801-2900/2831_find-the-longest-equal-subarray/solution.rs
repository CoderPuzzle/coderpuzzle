use std::collections::HashMap;

impl Solution {
    pub fn longest_equal_subarray(nums: Vec<i32>, k: i32) -> i32 {
        let mut positions_by_value: HashMap<i32, Vec<i32>> = HashMap::new();
        for (i, value) in nums.into_iter().enumerate() {
            positions_by_value.entry(value).or_default().push(i as i32);
        }
        let mut answer = 0;
        for positions in positions_by_value.values() {
            let mut left: usize = 0;
            for right in 0..positions.len() {
                // Span length minus kept copies is the deletion cost.
                while (positions[right] - positions[left]) - (right - left) as i32 > k {
                    left += 1;
                }
                answer = answer.max((right - left + 1) as i32);
            }
        }
        answer
    }
}
