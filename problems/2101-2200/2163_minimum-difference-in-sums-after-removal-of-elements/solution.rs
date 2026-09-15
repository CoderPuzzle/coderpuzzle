use std::cmp::Reverse;
use std::collections::BinaryHeap;

impl Solution {
    pub fn minimum_difference(nums: Vec<i32>) -> i64 {
        let total = nums.len();
        let n = total / 3;

        // left_min[i] = sum of the n smallest values among nums[0..i] (valid when i >= n-1)
        let mut left_min: Vec<Option<i64>> = vec![None; total];
        let mut heap: BinaryHeap<i64> = BinaryHeap::new(); // keeps the n smallest so far
        let mut running: i64 = 0;
        for (i, &value) in nums.iter().enumerate() {
            heap.push(value as i64);
            running += value as i64;
            if heap.len() > n {
                running -= heap.pop().unwrap(); // drop the largest kept
            }
            if heap.len() == n {
                left_min[i] = Some(running);
            }
        }

        // right_max[i] = sum of the n largest values among nums[i..] (valid when total - i >= n)
        let mut right_max: Vec<Option<i64>> = vec![None; total];
        let mut heap2: BinaryHeap<Reverse<i64>> = BinaryHeap::new(); // keeps the n largest so far
        let mut running2: i64 = 0;
        for i in (0..total).rev() {
            let value = nums[i] as i64;
            heap2.push(Reverse(value));
            running2 += value;
            if heap2.len() > n {
                running2 -= heap2.pop().unwrap().0; // drop the smallest kept
            }
            if heap2.len() == n {
                right_max[i] = Some(running2);
            }
        }

        let mut answer: Option<i64> = None;
        for i in n - 1..2 * n {
            if let (Some(left), Some(right)) = (left_min[i], right_max[i + 1]) {
                let candidate = left - right;
                if answer.is_none() || candidate < answer.unwrap() {
                    answer = Some(candidate);
                }
            }
        }
        answer.unwrap()
    }
}
