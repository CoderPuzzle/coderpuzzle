impl Solution {
    pub fn is_zero_array(nums: Vec<i32>, queries: Vec<Vec<i32>>) -> bool {
        let n = nums.len();
        // Difference array: +1 at l and -1 at r+1 per query; the spare slot
        // at index n absorbs the r+1 == n write without a bounds check.
        let mut diff = vec![0i64; n + 1];
        for q in &queries {
            diff[q[0] as usize] += 1;
            diff[q[1] as usize + 1] -= 1;
        }
        let mut coverage: i64 = 0;
        // The prefix sum recovers how many queries cover each index. Each
        // covering query removes at most one unit there, so zeroing is
        // possible iff coverage never falls below nums[i].
        for i in 0..n {
            coverage += diff[i];
            if coverage < nums[i] as i64 {
                return false;
            }
        }
        true
    }
}
