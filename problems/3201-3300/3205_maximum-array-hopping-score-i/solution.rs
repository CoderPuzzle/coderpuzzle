// dp[i] is the maximum score of a hopping path that starts at index i and
// ends at the last element: the next hop goes to some j > i and pays
// (j - i) * nums[j] plus whatever the best continuation from j earns. Fill
// right to left; every hop distance telescopes into the n - 1 units between
// index 0 and the end, so the answer stays below (n - 1) * max(nums) < 2^31
// and plain ints suffice.
impl Solution {
    pub fn max_score(nums: Vec<i32>) -> i32 {
        let n = nums.len();
        let mut dp = vec![0i32; n];
        for i in (0..n - 1).rev() {
            let mut best = 0;
            for j in i + 1..n {
                let score = (j - i) as i32 * nums[j] + dp[j];
                if score > best {
                    best = score;
                }
            }
            dp[i] = best;
        }
        dp[0]
    }
}
