impl Solution {
    // A window holding exactly k distinct values has no monotone shrink rule
    // — it can be too wide or too narrow from either side — but a window
    // holding at most t distinct values does. Count the subarrays with at
    // most k distinct values, subtract those with at most k - 1, and exactly
    // k is what remains.
    pub fn subarrays_with_k_distinct(nums: Vec<i32>, k: i32) -> i64 {
        Self::at_most(&nums, k) - Self::at_most(&nums, k - 1)
    }

    fn at_most(nums: &[i32], limit: i32) -> i64 {
        let mut freq = vec![0; nums.len() + 1]; // values lie in [1, n]
        let mut distinct = 0;
        let mut left = 0;
        let mut total = 0_i64;
        for (right, &value) in nums.iter().enumerate() {
            let slot = value as usize;
            if freq[slot] == 0 {
                distinct += 1;
            }
            freq[slot] += 1;
            while distinct > limit {
                let leaving = nums[left] as usize;
                freq[leaving] -= 1;
                if freq[leaving] == 0 {
                    distinct -= 1;
                }
                left += 1;
            }
            // every suffix of an at-most window also qualifies, so the
            // window's length counts the subarrays ending at right
            total += (right - left + 1) as i64;
        }
        total
    }
}
