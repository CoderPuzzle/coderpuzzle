impl Solution {
    pub fn maximum_length_of_ranges(nums: Vec<i32>) -> Vec<i32> {
        let n = nums.len();
        let mut left = vec![0i32; n]; // nearest index with a greater element on the left, +1
        let mut stack: Vec<usize> = Vec::new();
        for i in 0..n {
            while let Some(&top) = stack.last() {
                if nums[top] < nums[i] {
                    stack.pop();
                } else {
                    break;
                }
            }
            left[i] = stack.last().map(|&t| t as i32 + 1).unwrap_or(0);
            stack.push(i);
        }
        let mut right = vec![0i32; n]; // nearest index with a greater element on the right, -1
        stack.clear();
        for i in (0..n).rev() {
            while let Some(&top) = stack.last() {
                if nums[top] < nums[i] {
                    stack.pop();
                } else {
                    break;
                }
            }
            right[i] = stack.last().map(|&t| t as i32 - 1).unwrap_or(n as i32 - 1);
            stack.push(i);
        }
        (0..n).map(|i| right[i] - left[i] + 1).collect()
    }
}
