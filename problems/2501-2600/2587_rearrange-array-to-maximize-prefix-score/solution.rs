impl Solution {
    pub fn max_score(nums: Vec<i32>) -> i32 {
        // In descending order the first k elements are always the k largest
        // values, so every prefix sum is simultaneously maximal across all
        // rearrangements. Totals reach ±10^11, hence the i64 accumulator.
        let mut nums = nums;
        nums.sort_unstable_by(|a, b| b.cmp(a));
        let mut total: i64 = 0;
        let mut score = 0;
        for value in nums {
            total += value as i64;
            if total > 0 {
                score += 1;
            }
        }
        score
    }
}
