impl Solution {
    pub fn min_operations(nums: Vec<i32>) -> i32 {
        // Each element's popcount is the number of independent increments
        // it needs; the doublings are shared by the whole array, so only
        // the element with the most bits sets how many doublings are
        // needed.
        let mut total = 0;
        let mut max_bits = 0;
        for v in nums {
            total += (v as u32).count_ones() as i32;
            let bits = 32 - (v as u32).leading_zeros() as i32;
            max_bits = max_bits.max(bits);
        }
        total + (max_bits - 1).max(0)
    }
}
