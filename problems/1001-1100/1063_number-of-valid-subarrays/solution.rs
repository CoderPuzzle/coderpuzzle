impl Solution {
    pub fn valid_subarrays(nums: Vec<i32>) -> i64 {
        let n = nums.len();
        let mut total: i64 = 0;
        let mut stack: Vec<usize> = Vec::with_capacity(n + 1);
        for i in 0..=n {
            let current = if i == n { -1 } else { nums[i] };
            while let Some(&top) = stack.last() {
                if nums[top] > current {
                    stack.pop();
                    total += (i - top) as i64;
                } else {
                    break;
                }
            }
            stack.push(i);
        }
        total
    }
}
