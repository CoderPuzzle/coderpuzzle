use std::cmp::Reverse;
use std::collections::BinaryHeap;

impl Solution {
    pub fn get_order(tasks: Vec<Vec<i32>>) -> Vec<i32> {
        let n = tasks.len();
        let mut by_enqueue: Vec<usize> = (0..n).collect();
        // Indices pre-sorted by (enqueueTime, index): the arrival stream only moves forward.
        by_enqueue.sort_by(|&a, &b| tasks[a][0].cmp(&tasks[b][0]).then(a.cmp(&b)));
        // Min-heap ordered by (processingTime, index).
        let mut heap: BinaryHeap<Reverse<(i64, usize)>> = BinaryHeap::new();
        let mut order: Vec<i32> = Vec::with_capacity(n);
        let mut time: i64 = 0;
        let mut i = 0usize;
        while i < n || !heap.is_empty() {
            if heap.is_empty() {
                // CPU idle: jump straight to the next arrival instead of ticking.
                let enq = tasks[by_enqueue[i]][0] as i64;
                time = time.max(enq);
            }
            // Enqueue everything available at this instant BEFORE popping, so all
            // contenders compete under the same (processingTime, index) order.
            while i < n && (tasks[by_enqueue[i]][0] as i64) <= time {
                let j = by_enqueue[i];
                heap.push(Reverse((tasks[j][1] as i64, j)));
                i += 1;
            }
            // Winner: shortest processing time, smallest index on ties.
            if let Some(Reverse((proc, j))) = heap.pop() {
                order.push(j as i32);
                time += proc; // clock advances by exactly the winner's duration
            }
        }
        order
    }
}
