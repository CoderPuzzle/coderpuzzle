use std::cmp::Reverse;
use std::collections::BinaryHeap;

impl Solution {
    pub fn earliest_second_to_mark_indices(nums: Vec<i32>, changeIndices: Vec<i32>) -> i32 {
        let n = nums.len();
        let m = changeIndices.len();

        // first occurrence (0-indexed second) of each index whose nums value is > 0
        let mut first: Vec<i64> = vec![-1; n];
        for i in (0..m).rev() {
            let idx = (changeIndices[i] - 1) as usize;
            if nums[idx] != 0 {
                first[idx] = i as i64;
            }
        }

        let total: i64 = nums.iter().map(|&x| x as i64).sum::<i64>() + n as i64;
        let mut low: i64 = n as i64;
        for i in 0..n {
            low += if first[i] != -1 { 1 } else { nums[i] as i64 };
        }
        let mut high: i64 = m as i64;
        while low <= high {
            let mid = low + (high - low) / 2;
            if Self::check(&nums, &changeIndices, &first, total, mid as usize) {
                high = mid - 1;
            } else {
                low = mid + 1;
            }
        }
        if low <= m as i64 {
            low as i32
        } else {
            -1
        }
    }

    fn check(nums: &[i32], changeIndices: &[i32], first: &[i64], total: i64, t: usize) -> bool {
        let mut minHeap: BinaryHeap<Reverse<i64>> = BinaryHeap::new();
        let mut cnt: i64 = 0;
        let mut sum: i64 = 0;
        for i in (0..t).rev() {
            let idx = (changeIndices[i] - 1) as usize;
            if first[idx] != i as i64 {
                cnt += 1;
                continue;
            }
            minHeap.push(Reverse(nums[idx] as i64));
            sum += nums[idx] as i64;
            if cnt > 0 {
                cnt -= 1;
            } else {
                cnt += 1;
                if let Some(Reverse(v)) = minHeap.pop() {
                    sum -= v;
                }
            }
        }
        total - (sum + minHeap.len() as i64) <= cnt
    }
}
