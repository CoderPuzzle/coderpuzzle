impl Solution {
    pub fn find_score(nums: Vec<i32>) -> i64 {
        // Visit candidates in (value, index) order once; the first
        // not-yet-marked visit of each position is exactly the statement's
        // "smallest unmarked, smallest index" pick, and its neighborhood is
        // marked on the spot, so later sorted candidates skip it naturally.
        // Chosen indices are pairwise non-adjacent, so at most ceil(n / 2)
        // values of up to 10^6 are summed — under 5 * 10^10, which is why
        // the score rides in an i64.
        let n = nums.len();
        let mut order: Vec<usize> = (0..n).collect();
        order.sort_by_key(|&i| (nums[i], i));
        let mut marked = vec![false; n];
        let mut score: i64 = 0;
        for i in order {
            if marked[i] {
                continue;
            }
            score += nums[i] as i64;
            marked[i] = true;
            if i > 0 {
                marked[i - 1] = true;
            }
            if i + 1 < n {
                marked[i + 1] = true;
            }
        }
        score
    }
}
