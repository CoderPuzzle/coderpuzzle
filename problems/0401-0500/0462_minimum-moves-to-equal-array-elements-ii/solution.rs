impl Solution {
    pub fn min_moves2(mut nums: Vec<i32>) -> i32 {
        // Each move shifts one element by one unit, so gathering everything
        // on a target t costs exactly sum |x - t| — and a sum of absolute
        // distances is minimized at the median. Pairing the sorted values
        // outermost-inward shows why: a pair pays its full gap wherever its
        // two elements meet, so any pivot between the two middles is
        // optimal, and the lower middle element is as good as any.
        //
        // Each distance is up to 2*10^9 and there are up to 10^5 of them, so
        // the running total spans 2*10^14 — well past i32 range — so the
        // accumulation runs in i64; only the promised 32-bit answer is cast
        // back down.
        nums.sort_unstable();
        let pivot = nums[(nums.len() - 1) / 2] as i64;
        let mut total = 0i64;
        for &value in &nums {
            total += (value as i64 - pivot).abs();
        }
        total as i32
    }
}
