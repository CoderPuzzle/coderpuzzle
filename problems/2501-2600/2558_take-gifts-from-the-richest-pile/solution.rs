use std::collections::BinaryHeap;

impl Solution {
    pub fn pick_gifts(gifts: Vec<i32>, k: i32) -> i64 {
        // Live-maximum simulation: each second the richest pile shrinks
        // to floor(sqrt(value)), which only ever lowers it, so
        // BinaryHeap replays the process; ties change nothing because
        // any pick order yields the same multiset. The answer is bounded
        // by 10^3 piles * 10^9 gifts = 10^12, so it needs i64; the sqrt
        // guess is corrected with exact integer squares.
        let mut heap: BinaryHeap<i64> = gifts.into_iter().map(|v| v as i64).collect();
        for _ in 0..k {
            let value = heap.pop().unwrap();
            let mut root = (value as f64).sqrt() as i64;
            while root * root > value {
                root -= 1;
            }
            while (root + 1) * (root + 1) <= value {
                root += 1;
            }
            heap.push(root);
        }
        heap.into_iter().sum()
    }
}
