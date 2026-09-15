impl Solution {
    pub fn moves_to_make_zigzag(nums: Vec<i32>) -> i32 {
        let cost = |valley_parity: usize| -> i32 {
            let mut moves = 0i32;
            let mut i = valley_parity;
            while i < nums.len() {
                // Valley must drop below both neighbors; the neighbors are
                // peaks of the other parity and never get decreased.
                let mut bound = i32::MAX;
                if i > 0 {
                    bound = bound.min(nums[i - 1]);
                }
                if i + 1 < nums.len() {
                    bound = bound.min(nums[i + 1]);
                }
                if nums[i] >= bound {
                    moves += nums[i] - bound + 1;
                }
                i += 2;
            }
            moves
        };
        cost(0).min(cost(1))
    }
}
