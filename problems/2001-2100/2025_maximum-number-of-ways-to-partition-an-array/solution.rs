use std::collections::HashMap;

impl Solution {
    pub fn ways_to_partition(nums: Vec<i32>, k: i32) -> i32 {
        let total: i64 = nums.iter().map(|&value| value as i64).sum();
        let mut right: HashMap<i64, i32> = HashMap::new();
        let mut prefix = 0i64;
        for pivot in 1..nums.len() {
            prefix += nums[pivot - 1] as i64;
            *right.entry(2 * prefix - total).or_insert(0) += 1;
        }

        let mut left: HashMap<i64, i32> = HashMap::new();
        let mut answer = *right.get(&0).unwrap_or(&0);
        prefix = 0;
        for (index, &value) in nums.iter().enumerate() {
            let delta = k as i64 - value as i64;
            let candidate = left.get(&delta).unwrap_or(&0) + right.get(&-delta).unwrap_or(&0);
            answer = answer.max(candidate);

            if index < nums.len() - 1 {
                prefix += value as i64;
                let difference = 2 * prefix - total;
                *right.get_mut(&difference).unwrap() -= 1;
                *left.entry(difference).or_insert(0) += 1;
            }
        }

        answer
    }
}
