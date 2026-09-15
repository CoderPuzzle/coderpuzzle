impl Solution {
    pub fn count_largest_group(n: i32) -> i32 {
        // Digit sums stay below 37 for n <= 10^4, so a fixed array replaces
        // a hash map: bucket every value by its digit sum, then count the
        // buckets reaching the maximum.
        let mut counts = [0i32; 37];
        let mut best = 0;
        for value in 1..=n {
            let mut digit_sum = 0;
            let mut rest = value;
            while rest > 0 {
                digit_sum += rest % 10;
                rest /= 10;
            }
            counts[digit_sum as usize] += 1;
            best = best.max(counts[digit_sum as usize]);
        }
        counts.iter().filter(|count| **count == best).count() as i32
    }
}
