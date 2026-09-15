use std::cmp::Reverse;
use std::collections::{BinaryHeap, VecDeque};

impl Solution {
    pub fn max_sum(nums: Vec<i32>, threshold: Vec<i32>) -> i64 {
        // An element unlocks when step reaches its threshold and stays
        // usable forever after. Bucket indices by unlock step; everything
        // at threshold 1 starts in the max-heap of usable values. The
        // heap holds (Reverse(value), index) so the root is the largest
        // usable value.
        let n = nums.len();
        let mut waiting: Vec<VecDeque<usize>> = vec![VecDeque::new(); n + 1];
        let mut live: BinaryHeap<(Reverse<i32>, usize)> = BinaryHeap::new();
        for i in 0..n {
            if threshold[i] <= 1 {
                live.push((Reverse(nums[i]), i));
            } else {
                waiting[threshold[i] as usize].push_back(i);
            }
        }
        let mut total: i64 = 0;
        let mut step = 1usize;
        loop {
            // Fold in this step's unlocks, then stop if nothing is usable.
            if step <= n {
                for &i in &waiting[step] {
                    live.push((Reverse(nums[i]), i));
                }
            }
            let Some((Reverse(v), _)) = live.pop() else {
                break;
            };
            total += v as i64;
            step += 1;
        }
        total
    }
}
