use std::collections::HashMap;

impl Solution {
    pub fn intersection(nums: Vec<Vec<i32>>) -> Vec<i32> {
        // Count how many arrays contain each value; a value present in
        // every array (each nums[i] holds distinct values) is counted
        // exactly nums.len() times, and the statement asks for those
        // values sorted ascending.
        let mut counts: HashMap<i32, i32> = HashMap::new();
        for arr in &nums {
            for &v in arr {
                *counts.entry(v).or_insert(0) += 1;
            }
        }
        let mut result: Vec<i32> = counts
            .into_iter()
            .filter(|&(_, c)| c == nums.len() as i32)
            .map(|(v, _)| v)
            .collect();
        result.sort_unstable();
        result
    }
}
