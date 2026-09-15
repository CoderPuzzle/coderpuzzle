use std::collections::{HashMap, VecDeque};

impl Solution {
    pub fn sort_array(nums: Vec<i32>, pre: Vec<i32>) -> i32 {
        let mut target = nums.clone();
        target.sort_unstable();
        if nums == target {
            return 0;
        }

        let mut queue = VecDeque::new();
        let mut distance = HashMap::new();
        queue.push_back(nums.clone());
        distance.insert(key(&nums), 0);
        while let Some(state) = queue.pop_front() {
            let current = distance[&key(&state)];
            for &length in &pre {
                let mut next = state.clone();
                next[..length as usize].reverse();
                if next == target {
                    return current + 1;
                }
                let next_key = key(&next);
                if !distance.contains_key(&next_key) {
                    distance.insert(next_key.clone(), current + 1);
                    queue.push_back(next);
                }
            }
        }
        -1
    }
}

fn key(values: &[i32]) -> String {
    values
        .iter()
        .map(|value| value.to_string())
        .collect::<Vec<_>>()
        .join(",")
}
