impl Solution {
    pub fn max_increasing_subarrays(nums: Vec<i32>) -> i32 {
        // Split nums into maximal strictly increasing runs. Two adjacent
        // k-windows either sit inside one run of length l (then k <= l / 2
        // floored) or meet exactly at a run boundary, one in each of two
        // consecutive runs (then k <= min of the two lengths). The answer
        // is the largest of those candidates over all boundaries.
        let mut best = 1usize;
        let mut prev = 0usize;
        let mut cur = 1usize;
        for i in 1..nums.len() {
            if nums[i] > nums[i - 1] {
                cur += 1;
            } else {
                best = best.max(prev.min(cur)).max(cur / 2);
                prev = cur;
                cur = 1;
            }
        }
        best.max(prev.min(cur)).max(cur / 2) as i32
    }
}
