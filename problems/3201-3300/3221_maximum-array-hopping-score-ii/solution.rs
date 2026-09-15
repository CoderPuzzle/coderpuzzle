// The optimal path always lands on the farthest index attaining the maximum
// of the remaining suffix: every element after the current position is at
// most that maximum, so routing through it trades each leg for at least as
// much value per unit of distance over the same ground, and equal maxima
// favor the later occurrence (same value, longer hop). Build those farthest
// suffix argmaxes right to left, then walk the chain from index 0.
impl Solution {
    pub fn max_score(nums: Vec<i32>) -> i64 {
        let n = nums.len();
        let mut farthest = vec![0usize; n];
        farthest[n - 1] = n - 1;
        for i in (0..n - 1).rev() {
            farthest[i] = if nums[i] > nums[farthest[i + 1]] {
                i
            } else {
                farthest[i + 1]
            };
        }
        let mut score: i64 = 0;
        let mut pos = 0usize;
        while pos < n - 1 {
            let next = farthest[pos + 1];
            score += (next - pos) as i64 * nums[next] as i64;
            pos = next;
        }
        score
    }
}
