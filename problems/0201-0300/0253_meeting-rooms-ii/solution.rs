use std::cmp::Reverse;
use std::collections::BinaryHeap;

impl Solution {
    pub fn min_meeting_rooms(intervals: Vec<Vec<i32>>) -> i32 {
        if intervals.is_empty() {
            return 0;
        }
        let mut sorted = intervals;
        sorted.sort_by_key(|x| x[0]);
        let mut heap: BinaryHeap<Reverse<i32>> = BinaryHeap::new(); // end times of ongoing meetings
        for interval in &sorted {
            let (start, end) = (interval[0], interval[1]);
            if let Some(&Reverse(top)) = heap.peek() {
                if top <= start {
                    heap.pop();
                    heap.push(Reverse(end));
                    continue;
                }
            }
            heap.push(Reverse(end));
        }
        heap.len() as i32
    }
}
