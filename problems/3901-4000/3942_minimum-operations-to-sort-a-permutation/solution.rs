use std::collections::VecDeque;

impl Solution {
    pub fn min_operations(nums: Vec<i32>) -> i32 {
        let n = nums.len();
        let position = nums.iter().position(|&value| value == 0).unwrap();
        let (target_kind, target_shift) = if is_rotation_of_sorted(&nums, position) {
            (0, position)
        } else {
            let reversed: Vec<i32> = nums.iter().rev().copied().collect();
            let reversed_position = reversed.iter().position(|&value| value == 0).unwrap();
            if !is_rotation_of_sorted(&reversed, reversed_position) {
                return -1;
            }
            (1, reversed_position)
        };

        let mut distance = vec![vec![-1; n]; 2];
        let mut queue = VecDeque::new();
        distance[0][0] = 0;
        queue.push_back(0usize);
        while let Some(state) = queue.pop_front() {
            let kind = state / n;
            let shift = state % n;
            if kind == target_kind && shift == target_shift {
                return distance[kind][shift];
            }
            let neighbors = [(kind, (shift + 1) % n), (1 - kind, (n - shift) % n)];
            for (next_kind, next_shift) in neighbors {
                if distance[next_kind][next_shift] == -1 {
                    distance[next_kind][next_shift] = distance[kind][shift] + 1;
                    queue.push_back(next_kind * n + next_shift);
                }
            }
        }
        -1
    }
}

fn is_rotation_of_sorted(nums: &[i32], start: usize) -> bool {
    let n = nums.len();
    (0..n).all(|i| nums[(start + i) % n] == i as i32)
}
