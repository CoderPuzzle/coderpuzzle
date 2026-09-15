use std::collections::HashMap;

impl Solution {
    pub fn get_distances(arr: Vec<i32>) -> Vec<i64> {
        let mut answer = vec![0_i64; arr.len()];
        let mut counts = HashMap::<i32, i64>::new();
        let mut sums = HashMap::<i32, i64>::new();
        for (index, &value) in arr.iter().enumerate() {
            answer[index] +=
                index as i64 * counts.get(&value).copied().unwrap_or(0) - sums.get(&value).copied().unwrap_or(0);
            *counts.entry(value).or_insert(0) += 1;
            *sums.entry(value).or_insert(0) += index as i64;
        }
        counts.clear();
        sums.clear();
        for index in (0..arr.len()).rev() {
            let value = arr[index];
            answer[index] +=
                sums.get(&value).copied().unwrap_or(0) - index as i64 * counts.get(&value).copied().unwrap_or(0);
            *counts.entry(value).or_insert(0) += 1;
            *sums.entry(value).or_insert(0) += index as i64;
        }
        answer
    }
}
