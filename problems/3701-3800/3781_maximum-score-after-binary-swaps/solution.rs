use std::collections::BinaryHeap;

impl Solution {
    pub fn maximum_score(nums: Vec<i32>, s: String) -> i64 {
        // Sweep left to right pushing every value as a candidate final
        // slot; the '1' met at index i claims the best slot offered so
        // far. The score peaks at 10^5 * 10^9 = 10^14, so it accumulates
        // in an i64.
        let s = s.as_bytes();
        let mut heap: BinaryHeap<i32> = BinaryHeap::new();
        let mut answer: i64 = 0;
        for i in 0..nums.len() {
            heap.push(nums[i]);
            if s[i] == b'1' {
                answer += heap.pop().unwrap() as i64;
            }
        }
        answer
    }
}
