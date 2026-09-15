impl Solution {
    // Index 0 can only reach 1 via the flip starting at itself, and once
    // fixed no further flip may touch it — a left-to-right sweep is
    // forced. flipped tracks whether the remaining suffix is currently
    // inverted; each effective 0 forces one more flip, which also
    // re-inverts every later position at once. At most one operation per
    // index, so the count fits i32 for n <= 10^5.
    pub fn min_operations(nums: Vec<i32>) -> i32 {
        let mut ops = 0i32;
        let mut flipped = false;
        for &bit in &nums {
            if (bit == 1) == flipped {
                ops += 1;
                flipped = !flipped;
            }
        }
        ops
    }
}
