use std::collections::HashMap;

impl Solution {
    pub fn number_of_subarrays(nums: Vec<i32>) -> i64 {
        let n = nums.len();
        // left_greater[i]: nearest index to the left with a strictly greater value
        let mut left_greater = vec![-1i64; n];
        let mut stack: Vec<usize> = Vec::with_capacity(n);
        for i in 0..n {
            let x = nums[i];
            // values <= x can never be the nearest greater for a later element
            while let Some(&top) = stack.last() {
                if nums[top] <= x {
                    stack.pop();
                } else {
                    break;
                }
            }
            left_greater[i] = stack.last().map(|&t| t as i64).unwrap_or(-1);
            stack.push(i);
        }

        // earlier positions of each value, always appended in increasing order
        let mut positions: HashMap<i32, Vec<usize>> = HashMap::new();
        let mut ans: i64 = 0;
        for i in 0..n {
            let x = nums[i];
            let lst = positions.entry(x).or_insert_with(Vec::new);
            let lg = left_greater[i];
            // partition_point acts as bisect_right: starts beyond left_greater[i]
            let lo = lst.partition_point(|&v| (v as i64) <= lg);
            // equal-value starts beyond left_greater[i], plus the singleton [i..i]
            let count = 1 + lst.len() as i64 - lo as i64;
            ans += count;
            lst.push(i);
        }
        ans
    }
}
