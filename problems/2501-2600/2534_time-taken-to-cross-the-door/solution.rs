use std::collections::VecDeque;

impl Solution {
    pub fn time_taken(arrival: Vec<i32>, state: Vec<i32>) -> Vec<i32> {
        // Two FIFO queues fed by an arrival pointer (equal arrival seconds
        // enter index order automatically). prev_dir carries the direction
        // of the previous second: while both sides compete the door keeps
        // its streak, and exits win only when the door has just been idle.
        let n = arrival.len();
        let mut enter_q: VecDeque<usize> = VecDeque::new();
        let mut exit_q: VecDeque<usize> = VecDeque::new();
        let mut ans = vec![0i32; n];
        let mut i = 0usize;
        let mut t: i64 = 0;
        let mut prev_dir: i32 = -1; // -1 unused, 0 entering, 1 exiting
        let mut done = 0;
        while done < n {
            while i < n && arrival[i] as i64 <= t {
                if state[i] == 1 {
                    exit_q.push_back(i);
                } else {
                    enter_q.push_back(i);
                }
                i += 1;
            }
            if enter_q.is_empty() && exit_q.is_empty() {
                t = arrival[i] as i64; // jump the clock; idle breaks streaks
                prev_dir = -1;
                continue;
            }
            let d = if !enter_q.is_empty() && !exit_q.is_empty() {
                if prev_dir != -1 {
                    prev_dir
                } else {
                    1
                }
            } else if !exit_q.is_empty() {
                1
            } else {
                0
            };
            let j = if d == 1 {
                exit_q.pop_front().unwrap()
            } else {
                enter_q.pop_front().unwrap()
            };
            ans[j] = t as i32;
            prev_dir = d;
            done += 1;
            t += 1;
        }
        ans
    }
}
