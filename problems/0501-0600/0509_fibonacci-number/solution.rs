impl Solution {
    pub fn fib(n: i32) -> i32 {
        // Every Fibonacci number is the sum of the two before it, so one walk
        // up from the seeds F(0) = 0 and F(1) = 1 reaches F(n): roll the pair
        // forward and the second variable ends on the answer. Only the last
        // two values ever matter, so nothing is tabulated. F(30) = 832040,
        // comfortably inside i32 range, so plain 32-bit addition carries the
        // whole domain.
        if n < 2 {
            return n;
        }
        let mut previous = 0;
        let mut current = 1;
        for _ in 1..n {
            let next = previous + current;
            previous = current;
            current = next;
        }
        current
    }
}
