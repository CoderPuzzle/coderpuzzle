// The optimal first hop out of any position lands on the nearest later
// index holding a strictly greater value: everything in between is at most
// the current value, so any detour's legs earn no more per unit of
// distance than staying put over the same ground, while the leg beyond the
// swap gains the strictly larger rate. When no greater value remains,
// jumping straight to the last index is optimal by the same telescoping
// bound. Precompute those nearest greater neighbors with a right-to-left
// monotonic stack, then walk the chain.
impl Solution {
    pub fn find_maximum_score(nums: Vec<i32>) -> i64 {
        let n = nums.len();
        let mut jump = vec![n - 1; n];
        let mut stack: Vec<usize> = Vec::with_capacity(n);
        for i in (0..n).rev() {
            while let Some(&top) = stack.last() {
                if nums[top] <= nums[i] {
                    stack.pop();
                } else {
                    break;
                }
            }
            if let Some(&top) = stack.last() {
                jump[i] = top;
            }
            stack.push(i);
        }
        let mut score: i64 = 0;
        let mut pos = 0usize;
        while pos < n - 1 {
            score += (jump[pos] - pos) as i64 * nums[pos] as i64;
            pos = jump[pos];
        }
        score
    }
}
