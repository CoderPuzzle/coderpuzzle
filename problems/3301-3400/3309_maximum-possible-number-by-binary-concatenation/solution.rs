impl Solution {
    pub fn max_good_number(nums: Vec<i32>) -> i32 {
        // Only 3! = 6 orders exist, so try each one exhaustively. Combining
        // is arithmetic: shift the accumulator left by the number's bit
        // width and OR the number into the freed bits. Three 7-bit values
        // concatenate to at most 21 bits, well inside i32.
        let mut best = 0;
        let orders = [
            [nums[0], nums[1], nums[2]],
            [nums[0], nums[2], nums[1]],
            [nums[1], nums[0], nums[2]],
            [nums[1], nums[2], nums[0]],
            [nums[2], nums[0], nums[1]],
            [nums[2], nums[1], nums[0]],
        ];
        for order in &orders {
            let mut value = 0i32;
            for &x in order {
                value = (value << (32 - x.leading_zeros())) | x;
            }
            best = best.max(value);
        }
        best
    }
}
