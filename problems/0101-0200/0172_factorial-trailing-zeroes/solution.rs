impl Solution {
    pub fn trailing_zeroes(n: i32) -> i32 {
        // Twos outnumber fives in n!, so each trailing zero costs exactly one
        // factor 5: the answer is Legendre's sum n/5 + n/25 + n/125 + ...
        // The power accumulator is i64 because the first power of 5 past a
        // large n is 5^14, beyond i32's range; a wrapped-negative power would
        // re-enter the loop forever.
        let mut count: i64 = 0;
        let mut power: i64 = 5;
        while power <= n as i64 {
            count += n as i64 / power;
            power *= 5;
        }
        count as i32
    }
}
