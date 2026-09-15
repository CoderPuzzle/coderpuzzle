impl Solution {
    pub fn mirror_distance(mut n: i32) -> i32 {
        // Peel digits least-significant first to build the reversal; any
        // trailing zeros of n simply never materialize as leading zeros.
        // Both sides stay below 10^9 < 2^31, so the subtraction and the
        // 10 * reversed step cannot overflow.
        let original = n;
        let mut reversed = 0i32;
        while n > 0 {
            reversed = reversed * 10 + n % 10;
            n /= 10;
        }
        (original - reversed).abs()
    }
}
