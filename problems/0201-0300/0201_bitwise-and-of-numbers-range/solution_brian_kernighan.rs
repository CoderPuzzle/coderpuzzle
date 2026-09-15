impl Solution {
    pub fn range_bitwise_and(left: i32, right: i32) -> i32 {
        let mut right = right;
        // Clear the lowest set bit of right while it still exceeds left:
        // every cleared bit is one that flips somewhere in [left, right],
        // so it cannot survive the range's AND.
        while right > left {
            right &= right - 1;
        }
        // Only the common prefix of the endpoints remains — the AND itself.
        right
    }
}
