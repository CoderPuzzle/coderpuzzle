impl Solution {
    pub fn min_moves(nums: Vec<i32>) -> i32 {
        // Incrementing n - 1 elements is, in relative terms, decrementing the
        // one element left out: every pairwise gap moves exactly as it would
        // if that single element had dropped by 1. So the question becomes how
        // many unit decrements make all elements equal, and since decrements
        // never lift anything, the common target is the current minimum.
        //
        // The total spans n * |nums[i]|, up to 10^14 — well past i32 range —
        // so the accumulation runs in i64; only the difference, the promised
        // 32-bit answer, is cast back down.
        let mut total = 0i64;
        let mut minimum = nums[0];
        for &value in &nums {
            total += value as i64;
            if value < minimum {
                minimum = value;
            }
        }
        (total - minimum as i64 * nums.len() as i64) as i32
    }
}
