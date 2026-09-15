use std::collections::BinaryHeap;

impl Solution {
    pub fn max_kelements(nums: Vec<i32>, k: i32) -> i64 {
        // Greedy on the live maximum: picking anything other than the
        // largest element both gains less now and leaves that giant
        // intact, so swapping the order never helps. BinaryHeap serves
        // each max query in O(log n); the score fits i64 at k*10^9.
        let mut heap: BinaryHeap<i64> = nums.into_iter().map(|v| v as i64).collect();
        let mut score: i64 = 0;
        for _ in 0..k {
            let value = heap.pop().unwrap();
            score += value;
            heap.push((value + 2) / 3);
        }
        score
    }
}
