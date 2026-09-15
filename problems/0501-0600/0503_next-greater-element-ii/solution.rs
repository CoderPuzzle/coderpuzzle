impl Solution {
    pub fn next_greater_elements(nums: Vec<i32>) -> Vec<i32> {
        let n = nums.len();
        let mut result = vec![-1; n];
        let mut stack: Vec<usize> = Vec::new();
        // One extra lap simulates the wrap-around without copying the
        // array; the resolver of any waiting index lies within one cycle
        // ahead.
        for i in 0..2 * n {
            let idx = i % n;
            // The stack holds indices with non-increasing values; the
            // current circular value is the first strictly greater one
            // ahead of each popped index (equal values are not popped).
            while let Some(&top) = stack.last() {
                if nums[top] < nums[idx] {
                    result[top] = nums[idx];
                    stack.pop();
                } else {
                    break;
                }
            }
            // Push only during the first lap; the second just resolves.
            if i < n {
                stack.push(idx);
            }
        }
        result
    }
}
