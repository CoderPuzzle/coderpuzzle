impl Solution {
    pub fn minimum_difference(mut nums: Vec<i32>, k: i32) -> i32 {
        // Sort so the k chosen students form a contiguous window; the span
        // of that window is its highest minus lowest score.
        let k = k as usize;
        nums.sort_unstable();
        let mut best = nums[k - 1] - nums[0];
        for i in k..nums.len() {
            let gap = nums[i] - nums[i - k + 1];
            if gap < best {
                best = gap;
            }
        }
        best
    }
}
