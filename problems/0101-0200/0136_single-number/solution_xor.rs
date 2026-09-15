impl Solution {
    pub fn single_number(nums: Vec<i32>) -> i32 {
        // XOR fold: x ^ x = 0 cancels each pair, x ^ 0 = x passes the lone
        // value through, and commutativity makes grouping order irrelevant.
        let mut result = 0;
        for value in nums {
            result ^= value;
        }
        // Only the unpaired element survives in the accumulator.
        result
    }
}
