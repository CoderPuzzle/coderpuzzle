impl Solution {
    pub fn find_k_or(nums: Vec<i32>, k: i32) -> i32 {
        // Inputs are < 2^31, so only bit positions 0..30 can ever appear and
        // the result stays a non-negative 32-bit integer.
        let mut result = 0i32;
        for bit in 0..31 {
            // Count the elements carrying this bit; k or more set it.
            let mut count = 0i32;
            for num in &nums {
                count += (num >> bit) & 1;
            }
            if count >= k {
                result |= 1 << bit;
            }
        }
        result
    }
}
