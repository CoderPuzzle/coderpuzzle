impl Solution {
    pub fn count_digits(num: i32) -> i32 {
        // Peel digits off the low end with % 10 / / 10 and test each one
        // against the untouched original. The input guarantees no zero
        // digit, so every divisor test is safe.
        let mut count = 0;
        let mut rest = num;
        while rest > 0 {
            if num % (rest % 10) == 0 {
                count += 1;
            }
            rest /= 10;
        }
        count
    }
}
