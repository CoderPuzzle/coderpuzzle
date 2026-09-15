use std::collections::BinaryHeap;

impl Solution {
    pub fn schedule_course(courses: Vec<Vec<i32>>) -> i32 {
        let mut sorted = courses;
        sorted.sort_by_key(|course| course[1]);
        let mut heap: BinaryHeap<i32> = BinaryHeap::new(); // max-heap of taken durations
        let mut total: i64 = 0;
        for course in sorted {
            let (duration, last_day) = (course[0] as i64, course[1] as i64);
            if total + duration <= last_day {
                total += duration;
                heap.push(course[0]);
            } else if heap.peek().is_some_and(|&longest| longest > course[0]) {
                total += duration - heap.pop().unwrap() as i64;
                heap.push(course[0]);
            }
        }
        heap.len() as i32
    }
}
