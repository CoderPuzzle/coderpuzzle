use std::collections::VecDeque;

impl Solution {
    pub fn continuous_subarrays(nums: Vec<i32>) -> i64 {
        let mut min_dq: VecDeque<usize> = VecDeque::new(); // indices, values increasing
        let mut max_dq: VecDeque<usize> = VecDeque::new(); // indices, values decreasing
        let mut count = 0i64;
        let mut left = 0usize;
        for right in 0..nums.len() {
            let value = nums[right];
            while let Some(&back) = min_dq.back() {
                if nums[back] >= value {
                    min_dq.pop_back();
                } else {
                    break;
                }
            }
            min_dq.push_back(right);
            while let Some(&back) = max_dq.back() {
                if nums[back] <= value {
                    max_dq.pop_back();
                } else {
                    break;
                }
            }
            max_dq.push_back(right);
            // equality is allowed, so only a spread above 2 forces the shrink
            while nums[*max_dq.front().unwrap()] - nums[*min_dq.front().unwrap()] > 2 {
                if *max_dq.front().unwrap() == left {
                    max_dq.pop_front();
                }
                if *min_dq.front().unwrap() == left {
                    min_dq.pop_front();
                }
                left += 1;
            }
            // every start in [left, right] keeps the spread within the band
            count += (right - left + 1) as i64;
        }
        count
    }
}
