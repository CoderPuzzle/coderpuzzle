impl Solution {
    pub fn find_maximums(nums: Vec<i32>) -> Vec<i32> {
        let n = nums.len();
        let mut left = vec![-1i32; n];
        let mut right = vec![n as i32; n];
        // Nearest strictly smaller element on each side. Popping on >= (not
        // just >) deliberately splits spans at equal values so every
        // duplicate owns the sub-window where it is the minimum.
        let mut stack: Vec<usize> = Vec::new();
        for i in 0..n {
            while let Some(&top) = stack.last() {
                if nums[top] >= nums[i] {
                    stack.pop();
                } else {
                    break;
                }
            }
            left[i] = stack.last().map(|&x| x as i32).unwrap_or(-1);
            stack.push(i);
        }
        stack.clear();
        for i in (0..n).rev() {
            while let Some(&top) = stack.last() {
                if nums[top] >= nums[i] {
                    stack.pop();
                } else {
                    break;
                }
            }
            right[i] = stack.last().map(|&x| x as i32).unwrap_or(n as i32);
            stack.push(i);
        }
        let mut ans = vec![0i32; n];
        for i in 0..n {
            // nums[i] is the minimum of any window within its maximal span,
            // so it seeds that length (max wins when spans collide).
            let length = (right[i] - left[i] - 1) as usize;
            if nums[i] > ans[length - 1] {
                ans[length - 1] = nums[i];
            }
        }
        // Seeding covers only maximal spans: a size-(k+1) window contains a
        // size-k sub-window with a no-smaller minimum, so answers are
        // monotone and this suffix max repairs every shorter length with the
        // best longer-span guarantee.
        for i in (0..n.saturating_sub(1)).rev() {
            if ans[i + 1] > ans[i] {
                ans[i] = ans[i + 1];
            }
        }
        ans
    }
}
