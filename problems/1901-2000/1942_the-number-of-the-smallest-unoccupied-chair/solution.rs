use std::cmp::Reverse;
use std::collections::BinaryHeap;

impl Solution {
    pub fn smallest_chair(times: Vec<Vec<i32>>, targetFriend: i32) -> i32 {
        let n = times.len();
        let mut order: Vec<usize> = (0..n).collect();
        order.sort_by_key(|&i| times[i][0]);
        // min-heap of (leaving_time, chair)
        let mut occupied: BinaryHeap<Reverse<(i64, i64)>> = BinaryHeap::new();
        // min-heap of free chair numbers
        let mut free: BinaryHeap<Reverse<i64>> = BinaryHeap::new();
        let mut next_chair: i64 = 0;
        for &i in &order {
            let arrival = times[i][0] as i64;
            let leaving = times[i][1] as i64;
            while let Some(&Reverse((lt, chair))) = occupied.peek() {
                if lt <= arrival {
                    occupied.pop();
                    free.push(Reverse(chair));
                } else {
                    break;
                }
            }
            let chair = if let Some(Reverse(c)) = free.pop() {
                c
            } else {
                let c = next_chair;
                next_chair += 1;
                c
            };
            if i as i32 == targetFriend {
                return chair as i32;
            }
            occupied.push(Reverse((leaving, chair)));
        }
        -1
    }
}
