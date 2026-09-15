impl Solution {
    pub fn min_operations(nums: Vec<i32>) -> i32 {
        // Monotonic stack of the minima of currently open windows. An
        // element equal to the top continues that window's group (same
        // operation), a larger element opens a new group (one more
        // operation), and anything smaller — including 0 — closes every
        // window above it.
        let mut ans = 0;
        let mut stack: Vec<i32> = Vec::with_capacity(nums.len());
        for &x in &nums {
            while let Some(&top) = stack.last() {
                if top <= x {
                    break;
                }
                stack.pop();
            }
            if x > 0 && stack.last().map_or(true, |&top| top < x) {
                ans += 1;
                stack.push(x);
            }
        }
        ans
    }
}
