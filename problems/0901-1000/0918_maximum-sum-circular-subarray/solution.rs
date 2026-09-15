impl Solution {
    pub fn max_subarray_sum_circular(nums: Vec<i32>) -> i32 {
        let total: i64 = nums.iter().map(|&x| x as i64).sum();
        // One pass runs Kadane twice: best_max for the non-wrapping case, and
        // best_min because a wrapping subarray is total minus the omitted
        // middle chunk, which must be minimized. Seeding with nums[0] keeps
        // every candidate non-empty.
        let mut cur_max = nums[0] as i64;
        let mut best_max = nums[0] as i64;
        let mut cur_min = nums[0] as i64;
        let mut best_min = nums[0] as i64;
        for &x in &nums[1..] {
            let x = x as i64;
            cur_max = x + cur_max.max(0);
            best_max = best_max.max(cur_max);
            cur_min = x + cur_min.min(0);
            best_min = best_min.min(cur_min);
        }
        if best_max < 0 {
            // All negative: the wrap candidate degenerates to the empty
            // subarray, which is not allowed — answer is the best run.
            return best_max as i32;
        }
        best_max.max(total - best_min) as i32
    }
}
