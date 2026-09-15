use std::cmp::Reverse;
use std::collections::BinaryHeap;

impl Solution {
    pub fn min_interval(intervals: Vec<Vec<i32>>, queries: Vec<i32>) -> Vec<i32> {
        let mut sorted = intervals.clone();
        sorted.sort();
        // Sweep queries in ascending order so each interval's life is a contiguous
        // stretch of the sweep: live from its left end, dead past its right end.
        let mut order: Vec<usize> = (0..queries.len()).collect();
        order.sort_by_key(|&j| queries[j]);
        // Min-heap of (size, right) pairs ordered by size.
        let mut heap: BinaryHeap<Reverse<(i64, i64)>> = BinaryHeap::new();
        let mut answers = vec![0i32; queries.len()];
        let mut i = 0usize;
        let n = sorted.len();
        for &j in &order {
            let q = queries[j] as i64;
            // Intervals whose left end has been reached are now live (size, right).
            while i < n && (sorted[i][0] as i64) <= q {
                let left = sorted[i][0] as i64;
                let right = sorted[i][1] as i64;
                heap.push(Reverse((right - left + 1, right)));
                i += 1;
            }
            // Lazy deletion: the top dies past its right end, and since queries only
            // grow it fails every later query too — discarding it is permanent.
            while let Some(&Reverse((_, right))) = heap.peek() {
                if right < q {
                    heap.pop();
                } else {
                    break;
                }
            }
            // Surviving top = smallest interval containing q.
            answers[j] = match heap.peek() {
                Some(&Reverse((size, _))) => size as i32,
                None => -1,
            };
        }
        answers
    }
}
