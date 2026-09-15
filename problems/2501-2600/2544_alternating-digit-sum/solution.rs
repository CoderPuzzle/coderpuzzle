impl Solution {
    pub fn alternate_digit_sum(n: i32) -> i32 {
        // Peel digits from the low end, alternating signs as we go: this
        // anchors "+" at the LEAST significant digit, while the statement
        // wants it on the most significant one. When the digit count is
        // even the accumulated total therefore needs a single final
        // negation.
        let mut total = 0;
        let mut sign = 1;
        let mut count = 0;
        let mut rest = n;
        while rest > 0 {
            total += sign * (rest % 10);
            sign = -sign;
            rest /= 10;
            count += 1;
        }
        if count % 2 == 0 {
            -total
        } else {
            total
        }
    }
}
