use std::collections::VecDeque;

impl Solution {
    pub fn maximum_robots(charge_times: Vec<i32>, running_costs: Vec<i32>, budget: i64) -> i32 {
        let n = charge_times.len();
        let mut dq: VecDeque<usize> = VecDeque::new(); // indices with decreasing charge times
        let mut run: i64 = 0;
        let mut left: usize = 0;
        let mut best: i32 = 0;
        // cost max(charge) + k*sum(run) is monotone in the window, so a
        // two-pointer sweep maximizes length under the budget
        for right in 0..n {
            // back indices with charge <= the new one can never be the max
            while let Some(&back) = dq.back() {
                if charge_times[back] <= charge_times[right] {
                    dq.pop_back();
                } else {
                    break;
                }
            }
            dq.push_back(right);
            run += running_costs[right] as i64;
            // over budget: shrink left, popping the front once left passes
            // it so a stale maximum never lingers
            while let Some(&front) = dq.front() {
                if charge_times[front] as i64 + (right - left + 1) as i64 * run > budget {
                    if front == left {
                        dq.pop_front();
                    }
                    run -= running_costs[left] as i64;
                    left += 1;
                } else {
                    break;
                }
            }
            let b = (right - left + 1) as i32;
            if b > best {
                best = b;
            }
        }
        best
    }
}
