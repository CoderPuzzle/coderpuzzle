use std::collections::BinaryHeap;

impl Solution {
    pub fn results_array(queries: Vec<Vec<i32>>, k: i32) -> Vec<i32> {
        // Max-heap of the k smallest distances so far; its peek is the
        // current kth nearest once the heap has filled up. Distances reach
        // 2 * 10^9, so they are computed and stored as i64 even though each
        // coordinate fits an i32.
        let mut heap: BinaryHeap<i64> = BinaryHeap::new();
        let mut result = Vec::with_capacity(queries.len());
        for query in &queries {
            let d = (query[0].abs() as i64) + (query[1].abs() as i64);
            if heap.len() < k as usize {
                heap.push(d);
            } else if *heap.peek().unwrap() > d {
                heap.pop();
                heap.push(d);
            }
            // A distance is at most 2 * 10^9, which fits an i32 exactly.
            if heap.len() == k as usize {
                result.push(*heap.peek().unwrap() as i32);
            } else {
                result.push(-1);
            }
        }
        result
    }
}
