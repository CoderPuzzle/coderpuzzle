impl Solution {
    pub fn min_length_after_removals(nums: Vec<i32>) -> i32 {
        // Each operation removes two elements of DIFFERENT values, so a
        // fixed value loses at most one copy per operation and no
        // schedule beats n - m operations, where m is the multiplicity
        // of the most frequent value (nor n / 2). The bound is reached
        // by repeatedly removing one element from the currently largest
        // value group and one from another group, so the answer is
        // n - 2 * min(n / 2, n - m), which simplifies to
        // max(n % 2, 2 * m - n). nums is sorted, so m is just the
        // longest run of equal elements, found in one scan. Every
        // quantity here stays far inside signed 32-bit range.
        let len = nums.len() as i32;
        let mut best = 1;
        let mut run = 1;
        for pair in nums.windows(2) {
            run = if pair[1] == pair[0] { run + 1 } else { 1 };
            best = best.max(run);
        }
        (len % 2).max(2 * best - len)
    }
}
