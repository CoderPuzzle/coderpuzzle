impl Solution {
    pub fn valid_subarray_size(nums: Vec<i32>, threshold: i32) -> i32 {
        let n = nums.len();
        // next_le[i] = nearest index j > i with nums[j] <= nums[i]
        let mut next_le = vec![n as i64; n];
        let mut stack: Vec<usize> = Vec::with_capacity(n);
        for i in (0..n).rev() {
            while let Some(&top) = stack.last() {
                if nums[top] > nums[i] {
                    stack.pop();
                } else {
                    break;
                }
            }
            next_le[i] = match stack.last() {
                Some(&top) => top as i64,
                None => n as i64,
            };
            stack.push(i);
        }

        // prev_lt[i] = nearest index j < i with nums[j] < nums[i]
        let mut prev_lt = vec![-1i64; n];
        stack.clear();
        for i in 0..n {
            while let Some(&top) = stack.last() {
                if nums[top] >= nums[i] {
                    stack.pop();
                } else {
                    break;
                }
            }
            prev_lt[i] = match stack.last() {
                Some(&top) => top as i64,
                None => -1,
            };
            stack.push(i);
        }

        let mut best: i64 = -1;
        for i in 0..n {
            let span = next_le[i] - prev_lt[i] - 1;
            let k = (threshold as i64) / (nums[i] as i64) + 1;
            if k <= span && (best == -1 || k < best) {
                best = k;
            }
        }
        best as i32
    }
}
