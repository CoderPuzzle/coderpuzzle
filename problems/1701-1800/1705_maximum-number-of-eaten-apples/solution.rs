use std::collections::BinaryHeap;

impl Solution {
    pub fn eaten_apples(apples: Vec<i32>, days: Vec<i32>) -> i32 {
        let n = apples.len();
        let mut heap: BinaryHeap<std::cmp::Reverse<(i64, i64)>> = BinaryHeap::new();
        let mut eaten = 0i64;
        // Greedy: always eat from the soonest-rotting batch. Exchange argument
        // — swapping a later-rotting apple for an earlier-rotting one never
        // reduces the total — so a min-heap keyed by rot day is optimal.
        for i in 0..n {
            if apples[i] > 0 {
                heap.push(std::cmp::Reverse((i as i64 + days[i] as i64, apples[i] as i64)));
            }
            // Purge batches whose rot day has arrived (inedible from day
            // i + days[i] on).
            while let Some(&std::cmp::Reverse((rot, _))) = heap.peek() {
                if rot <= i as i64 {
                    heap.pop();
                } else {
                    break;
                }
            }
            // Eat from the front batch; push it back minus one if any remain.
            if let Some(std::cmp::Reverse((rot, count))) = heap.pop() {
                eaten += 1;
                if count > 1 {
                    heap.push(std::cmp::Reverse((rot, count - 1)));
                }
            }
        }
        // After day n no new apples appear: keep purging and eating one apple
        // per day until every batch has rotted or been eaten.
        let mut day = n as i64;
        while !heap.is_empty() {
            while let Some(&std::cmp::Reverse((rot, _))) = heap.peek() {
                if rot <= day {
                    heap.pop();
                } else {
                    break;
                }
            }
            if heap.is_empty() {
                break;
            }
            if let Some(std::cmp::Reverse((rot, count))) = heap.pop() {
                eaten += 1;
                if count > 1 {
                    heap.push(std::cmp::Reverse((rot, count - 1)));
                }
            }
            day += 1;
        }
        eaten as i32
    }
}
