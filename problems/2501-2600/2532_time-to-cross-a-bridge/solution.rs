use std::cmp::Reverse;
use std::collections::BinaryHeap;

impl Solution {
    pub fn find_crossing_time(n: i32, k: i32, time: Vec<Vec<i32>>) -> i32 {
        // Priority is static per worker: least efficient = larger left+right,
        // ties to the larger index. A max-heap on (eff, i) pops exactly that.
        let mut left: BinaryHeap<(i32, i32)> = BinaryHeap::new();
        for i in 0..k as usize {
            left.push((time[i][0] + time[i][2], i as i32));
        }
        let mut right: BinaryHeap<(i32, i32)> = BinaryHeap::new(); // boxed workers on the right bank
        let mut pending: BinaryHeap<Reverse<(i32, i32, usize)>> = // (readyTime, join-side 1=right 0=left, i)
            BinaryHeap::new();
        let mut cur = 0i32; // instant the bridge becomes free again
        let mut sent = 0;
        let mut delivered = 0;
        let mut ans = 0;
        while delivered < n {
            while let Some(&Reverse((ready, side, i))) = pending.peek() {
                if ready > cur {
                    break;
                }
                pending.pop();
                let eff_i = (time[i][0] + time[i][2], i as i32);
                if side == 1 {
                    right.push(eff_i);
                } else {
                    left.push(eff_i);
                }
            }
            if !right.is_empty() {
                // A boxed worker on the right bank always has priority.
                let i = right.pop().unwrap().1 as usize;
                cur += time[i][2];
                delivered += 1;
                ans = ans.max(cur); // box reaches the left bank here
                if delivered == n {
                    break; // the final put never delays anything
                }
                pending.push(Reverse((cur + time[i][3], 0, i)));
            } else if !left.is_empty() && sent < n {
                let i = left.pop().unwrap().1 as usize;
                cur += time[i][0];
                sent += 1;
                pending.push(Reverse((cur + time[i][1], 1, i)));
            } else {
                // Nobody can cross yet: jump to the next readiness instant.
                match pending.peek() {
                    Some(Reverse((ready, _, _))) => cur = *ready,
                    None => break,
                }
            }
        }
        ans
    }
}
