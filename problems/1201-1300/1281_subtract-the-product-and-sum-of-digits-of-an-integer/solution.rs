impl Solution {
    // Peel digits from the right: n % 10 is the last digit, n / 10
    // discards it. Product and sum absorb each digit as it comes off.
    pub fn subtract_product_and_sum(mut n: i32) -> i32 {
        let mut product = 1;
        let mut total = 0;
        while n > 0 {
            let digit = n % 10;
            product *= digit;
            total += digit;
            n /= 10;
        }
        product - total
    }
}
