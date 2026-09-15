impl Solution {
    pub fn smallest_number(n: i32, t: i32) -> i32 {
        // Brute force: step up from n until the digit product divides by
        // t. Any run of 10 consecutive integers contains a multiple of 10,
        // whose digit product 0 is divisible by every t >= 1, so the loop
        // needs at most 10 steps.
        fn digit_product(mut value: i32) -> i32 {
            let mut product = 1;
            while value > 0 {
                product *= value % 10;
                value /= 10;
            }
            product
        }
        let mut n = n;
        while digit_product(n) % t != 0 {
            n += 1;
        }
        n
    }
}
