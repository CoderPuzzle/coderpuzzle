use std::cmp::Reverse;
use std::collections::BinaryHeap;

impl Solution {
    // free is ordered (weight, index); busy is ordered by release time.
    // Drain finished servers, wait for the earliest if needed, then hand
    // the task to the smallest free server.
    pub fn assign_tasks(servers: Vec<i32>, tasks: Vec<i32>) -> Vec<i64> {
        let mut free: BinaryHeap<Reverse<(i64, i64)>> = BinaryHeap::new();
        for (i, &w) in servers.iter().enumerate() {
            free.push(Reverse((w as i64, i as i64)));
        }
        let mut busy: BinaryHeap<Reverse<(i64, i64, i64)>> = BinaryHeap::new();
        let mut ans = Vec::with_capacity(tasks.len());
        let mut cur: i64 = 0;
        for (j, &cost) in tasks.iter().enumerate() {
            cur = cur.max(j as i64);
            while let Some(Reverse((rel, _, _))) = busy.peek() {
                if *rel > cur {
                    break;
                }
                let Reverse((_, w, i)) = busy.pop().unwrap();
                free.push(Reverse((w, i)));
            }
            if free.is_empty() {
                if let Some(Reverse((rel, _, _))) = busy.peek() {
                    cur = *rel;
                }
                while let Some(Reverse((rel, _, _))) = busy.peek() {
                    if *rel > cur {
                        break;
                    }
                    let Reverse((_, w, i)) = busy.pop().unwrap();
                    free.push(Reverse((w, i)));
                }
            }
            let Reverse((w, i)) = free.pop().unwrap();
            busy.push(Reverse((cur + cost as i64, w, i)));
            ans.push(i);
        }
        ans
    }
}
