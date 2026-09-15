impl Solution {
    pub fn min_operations(nums: Vec<i32>) -> i32 {
        // Each removal takes out one strictly increasing subsequence, so a
        // non-increasing chain (x >= y in order) must span distinct removals;
        // by Dilworth's theorem the answer is the longest non-increasing
        // subsequence length.
        let mut tails: Vec<i32> = Vec::new();
        for &x in &nums {
            // Negate and take the first pile top > v (bisect_right): equal
            // values extend the same pile, turning patience sorting's
            // "longest strictly increasing" into "longest non-increasing".
            let v = -x;
            let pos = tails.partition_point(|&t| t <= v);
            // The value opens a new pile (push) or replaces the leftmost
            // pile top it can sit on; piles stay sorted, and their count is
            // the answer.
            if pos == tails.len() {
                tails.push(v);
            } else {
                tails[pos] = v;
            }
        }
        tails.len() as i32
    }
}
