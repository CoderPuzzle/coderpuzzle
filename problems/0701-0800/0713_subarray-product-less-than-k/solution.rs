impl Solution {
    pub fn num_subarray_product_less_than_k(nums: Vec<i32>, k: i32) -> i32 {
        // Products are at least 1 (elements >= 1), so k <= 1 admits nothing.
        if k <= 1 {
            return 0;
        }
        let mut count = 0;
        let mut product: i64 = 1;
        let mut left = 0usize;
        for (right, &value) in nums.iter().enumerate() {
            product *= value as i64;
            // Shrink from the left until [left, right] is the longest window
            // ending here with product strictly below k.
            while product >= k as i64 {
                product /= nums[left] as i64;
                left += 1;
            }
            // Every subwindow also ends at right and has a smaller product:
            // right - left + 1 subarrays, each counted once by its right end.
            count += (right - left + 1) as i32;
        }
        count
    }
}
