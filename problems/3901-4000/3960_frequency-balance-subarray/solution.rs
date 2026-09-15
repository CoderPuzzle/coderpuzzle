use std::collections::HashMap;

impl Solution {
    pub fn get_length(nums: Vec<i32>) -> i32 {
        let n = nums.len();
        let mut best = 1;
        for left in 0..n {
            let mut counts: HashMap<i32, usize> = HashMap::new();
            let mut frequency_groups = vec![0usize; n + 1];
            let mut level_count = 0usize;
            let mut level_sum = 0usize;
            let mut level_square_sum = 0usize;

            for right in left..n {
                let value = nums[right];
                let old_frequency = *counts.get(&value).unwrap_or(&0);
                if old_frequency > 0 {
                    frequency_groups[old_frequency] -= 1;
                    if frequency_groups[old_frequency] == 0 {
                        level_count -= 1;
                        level_sum -= old_frequency;
                        level_square_sum -= old_frequency * old_frequency;
                    }
                }

                let new_frequency = old_frequency + 1;
                if frequency_groups[new_frequency] == 0 {
                    level_count += 1;
                    level_sum += new_frequency;
                    level_square_sum += new_frequency * new_frequency;
                }
                frequency_groups[new_frequency] += 1;
                counts.insert(value, new_frequency);

                let mut balanced = counts.len() == 1;
                if level_count == 2 && level_sum % 3 == 0 {
                    let lower = level_sum / 3;
                    balanced = level_square_sum == 5 * lower * lower;
                }
                if balanced {
                    best = best.max(right - left + 1);
                }
            }
        }
        best as i32
    }
}
