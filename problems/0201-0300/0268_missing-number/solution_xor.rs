impl Solution {
    pub fn missing_number(nums: Vec<i32>) -> i32 {
        // Seed with n — the one index the loop below never visits — then
        // fold every index 0..n-1 and every element into one accumulator.
        let mut result = nums.len() as i32;
        for (i, value) in nums.iter().enumerate() {
            // Each present value matches an index and cancels it; the absent
            // value pairs with nothing and survives the fold.
            result ^= i as i32 ^ value;
        }
        result
    }
}
