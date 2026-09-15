impl Solution {
    pub fn max_number(n: i64) -> i64 {
        // Numbers above 2^m - 1 sit inside [2^m, n], so every value in such
        // a range keeps bit m set and the AND can never fall to zero. x =
        // 2^m - 1 wins because its range contains both itself and 2^m,
        // which AND to zero together. With n <= 10^15 the i64 power of two
        // never overflows.
        let mut power: i64 = 1;
        while power * 2 <= n {
            power *= 2;
        }
        power - 1
    }
}
