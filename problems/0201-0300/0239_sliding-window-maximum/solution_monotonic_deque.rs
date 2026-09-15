use std::collections::VecDeque;

impl Solution {
    pub fn max_sliding_window(nums: Vec<i32>, k: i32) -> Vec<i32> {
        let k = k as usize;
        let mut dq: VecDeque<usize> = VecDeque::new(); // indices, values decreasing
        let mut result: Vec<i32> = Vec::with_capacity(nums.len().saturating_sub(k.saturating_sub(1)));
        for i in 0..nums.len() {
            let value = nums[i];
            while let Some(&back) = dq.back() {
                if nums[back] <= value {
                    dq.pop_back();
                } else {
                    break;
                }
            }
            dq.push_back(i);
            if dq[0] + k <= i {
                dq.pop_front();
            }
            if i + 1 >= k {
                result.push(nums[dq[0]]);
            }
        }
        result
    }
}
