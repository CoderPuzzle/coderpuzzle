impl Solution {
    pub fn get_least_frequent_digit(mut n: i32) -> i32 {
        // Count each digit into its bucket by peeling digits off with % and
        // /; the digit itself indexes a fixed array of ten counters.
        let mut counts = [0i32; 10];
        while n > 0 {
            counts[(n % 10) as usize] += 1;
            n /= 10;
        }
        // Ascending scan with a strict comparison keeps the smallest digit
        // on ties; empty buckets never qualify.
        let mut best = -1i32;
        for digit in 0..10i32 {
            let count = counts[digit as usize];
            if count > 0 && (best == -1 || count < counts[best as usize]) {
                best = digit;
            }
        }
        best
    }
}
