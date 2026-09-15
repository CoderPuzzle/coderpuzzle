impl Solution {
    pub fn compare_bitonic_sums(nums: Vec<i32>) -> i32 {
        let mut total = 0i64;
        let mut ascending = 0i64;
        let mut peak = nums[0];
        for (index, &value) in nums.iter().enumerate() {
            total += value as i64;
            if index == 0 || value > nums[index - 1] {
                ascending += value as i64;
            }
            peak = peak.max(value);
        }
        let descending = total - ascending + peak as i64;
        if ascending > descending {
            0
        } else if descending > ascending {
            1
        } else {
            -1
        }
    }
}
