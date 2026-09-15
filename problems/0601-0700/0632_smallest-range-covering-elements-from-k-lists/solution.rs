use std::cmp::Reverse;
use std::collections::BinaryHeap;

impl Solution {
    pub fn smallest_range(nums: Vec<Vec<i32>>) -> Vec<i32> {
        // Seed the heap with every list's head; the k-way merge sweeps candidate
        // ranges in order as the selection's minimum advances.
        let mut heap: BinaryHeap<Reverse<(i32, usize, usize)>> = BinaryHeap::new();
        let mut cur_max = nums[0][0];
        for (i, lst) in nums.iter().enumerate() {
            heap.push(Reverse((lst[0], i, 0)));
            if lst[0] > cur_max {
                cur_max = lst[0];
            }
        }
        let mut best_lo: i64 = 0;
        let mut best_hi: i64 = 0;
        let mut have = false;
        loop {
            let Reverse((lo, i, j)) = heap.pop().unwrap();
            let range = cur_max as i64 - lo as i64;
            // [lo, cur_max] covers all k lists: prefer smaller width, then
            // the smaller left endpoint on ties.
            if !have || range < best_hi - best_lo || (range == best_hi - best_lo && (lo as i64) < best_lo) {
                best_lo = lo as i64;
                best_hi = cur_max as i64;
                have = true;
            }
            if j + 1 == nums[i].len() {
                // The popped list is exhausted: no later selection can still
                // include it, so every further candidate would be worse.
                return vec![best_lo as i32, best_hi as i32];
            }
            let nxt = nums[i][j + 1];
            // The next element may raise the tracked maximum.
            if nxt > cur_max {
                cur_max = nxt;
            }
            heap.push(Reverse((nxt, i, j + 1)));
        }
    }
}
