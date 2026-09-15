impl Solution {
    pub fn range_bitwise_and(left: i32, right: i32) -> i32 {
        let (mut left, mut right) = (left, right);
        let mut shift = 0;
        // Shift both endpoints right until they agree: what remains is the
        // common binary prefix. Every bit below it flips through 0 somewhere
        // in [left, right], so the range's AND keeps only the prefix.
        while left < right {
            left >>= 1;
            right >>= 1;
            shift += 1;
        }
        // Restore the prefix to its original position, zeros below.
        left << shift
    }
}
