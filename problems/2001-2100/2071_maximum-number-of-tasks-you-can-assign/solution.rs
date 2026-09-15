use std::collections::VecDeque;

impl Solution {
    pub fn max_task_assign(mut tasks: Vec<i32>, mut workers: Vec<i32>, pills: i32, strength: i32) -> i32 {
        tasks.sort_unstable();
        workers.sort_unstable();
        let feasible = |count: usize| -> bool {
            let mut available = VecDeque::with_capacity(count);
            let mut task_index = 0;
            let mut pills_left = pills;
            for &worker in &workers[workers.len() - count..] {
                while task_index < count && tasks[task_index] as i64 <= worker as i64 + strength as i64 {
                    available.push_back(tasks[task_index]);
                    task_index += 1;
                }
                let Some(&easiest) = available.front() else {
                    return false;
                };
                if easiest <= worker {
                    available.pop_front();
                } else {
                    if pills_left == 0 {
                        return false;
                    }
                    pills_left -= 1;
                    available.pop_back();
                }
            }
            true
        };

        let mut low = 0;
        let mut high = tasks.len().min(workers.len()) + 1;
        while low + 1 < high {
            let middle = low + (high - low) / 2;
            if feasible(middle) {
                low = middle;
            } else {
                high = middle;
            }
        }
        low as i32
    }
}
