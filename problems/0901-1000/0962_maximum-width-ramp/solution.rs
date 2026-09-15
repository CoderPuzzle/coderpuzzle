impl Solution {
    pub fn max_width_ramp(nums: Vec<i32>) -> i32 {
        // Monotonic stack of record lows: an index matters as a left end
        // only when no earlier index holds a smaller value.
        let mut stack: Vec<usize> = Vec::new();
        for i in 0..nums.len() {
            if stack.is_empty() || nums[*stack.last().unwrap()] > nums[i] {
                stack.push(i);
            }
        }
        // Right-to-left: the first (largest) j that dominates a stack top
        // pops it at that top's widest possible width.
        let mut best = 0;
        for j in (0..nums.len()).rev() {
            while let Some(&top) = stack.last() {
                if nums[top] > nums[j] {
                    break;
                }
                stack.pop();
                best = best.max(j - top);
            }
        }
        best as i32
    }
}
