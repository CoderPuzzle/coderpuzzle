use std::collections::VecDeque;

impl Solution {
    pub fn minimum_operations(nums: Vec<i32>, start: i32, goal: i32) -> i32 {
        let mut distance = vec![-1_i32; 1001];
        distance[start as usize] = 0;
        let mut queue = VecDeque::from([start]);

        while let Some(value) = queue.pop_front() {
            let next_distance = distance[value as usize] + 1;
            for &number in &nums {
                for candidate in [value + number, value - number, value ^ number] {
                    if candidate == goal {
                        return next_distance;
                    }
                    if (0..=1000).contains(&candidate) && distance[candidate as usize] == -1 {
                        distance[candidate as usize] = next_distance;
                        queue.push_back(candidate);
                    }
                }
            }
        }
        -1
    }
}
