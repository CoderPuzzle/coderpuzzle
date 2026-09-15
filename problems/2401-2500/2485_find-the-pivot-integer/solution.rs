impl Solution {
    pub fn pivot_integer(n: i32) -> i32 {
        // The pivot x satisfies sum(1..x) == sum(x..n). Both sides collapse
        // to x(x+1)/2 and n(n+1)/2 - (x-1)x/2, so 2x^2 = n(n+1): the pivot
        // exists exactly when the total sum is a perfect square, and equals
        // its square root. n <= 1000 keeps the square root exact in f64.
        let total = n * (n + 1) / 2;
        let r = (total as f64).sqrt() as i32;
        if r * r == total {
            r
        } else {
            -1
        }
    }
}
