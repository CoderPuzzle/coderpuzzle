use std::cmp::Reverse;
use std::collections::BinaryHeap;

impl Solution {
    pub fn k_sum(nums: Vec<i32>, k: i32) -> i64 {
        // every subsequence sum = base - (subset sum of absolute values)
        let mut base: i64 = 0;
        for &x in &nums {
            if x > 0 {
                base += x as i64;
            }
        }
        let mut costs: Vec<i64> = nums.iter().map(|&x| (x as i64).abs()).collect();
        costs.sort_unstable();
        let k = k as i64;
        if k == 1 {
            return base;
        }
        let n = costs.len();
        // min-heap of (sum, idx); ties on sum broken by smaller idx
        let mut heap: BinaryHeap<Reverse<(i64, usize)>> = BinaryHeap::new();
        heap.push(Reverse((costs[0], 0usize)));
        let mut count: i64 = 1; // empty subset (sum 0) is the 1st smallest
        while count < k {
            let Reverse((cur, idx)) = heap.pop().unwrap();
            count += 1;
            if count == k {
                return base - cur;
            }
            if idx + 1 < n {
                heap.push(Reverse((cur - costs[idx] + costs[idx + 1], idx + 1)));
                heap.push(Reverse((cur + costs[idx + 1], idx + 1)));
            }
        }
        base
    }
}
