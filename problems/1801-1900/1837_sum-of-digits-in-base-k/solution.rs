impl Solution {
    // Repeated division by k peels off one base-k digit at a time; the
    // digits arrive least-significant first but summing is order-free.
    pub fn sum_base(mut n: i32, k: i32) -> i32 {
        let mut total = 0;
        while n > 0 {
            total += n % k;
            n /= k;
        }
        total
    }
}
