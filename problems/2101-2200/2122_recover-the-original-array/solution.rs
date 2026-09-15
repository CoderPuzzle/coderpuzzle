use std::collections::HashMap;

impl Solution {
    pub fn recover_array(nums: Vec<i32>) -> Vec<i32> {
        let mut values = nums;
        values.sort_unstable();
        let target_length = values.len() / 2;
        for candidate_index in 1..values.len() {
            let difference = values[candidate_index] - values[0];
            if difference <= 0 || difference % 2 != 0 {
                continue;
            }

            let mut counts: HashMap<i32, i32> = HashMap::new();
            for &value in &values {
                *counts.entry(value).or_insert(0) += 1;
            }
            let mut recovered = Vec::with_capacity(target_length);
            for &lower in &values {
                if counts.get(&lower).copied().unwrap_or(0) == 0 {
                    continue;
                }
                let higher = lower + difference;
                if counts.get(&higher).copied().unwrap_or(0) == 0 {
                    break;
                }
                *counts.get_mut(&lower).unwrap() -= 1;
                *counts.get_mut(&higher).unwrap() -= 1;
                recovered.push(lower + difference / 2);
            }
            if recovered.len() == target_length {
                return recovered;
            }
        }
        Vec::new()
    }
}
