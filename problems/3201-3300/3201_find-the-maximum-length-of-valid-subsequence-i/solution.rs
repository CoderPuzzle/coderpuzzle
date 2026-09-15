impl Solution {
    pub fn maximum_length(nums: Vec<i32>) -> i32 {
        // Only parities matter: a valid subsequence either never changes
        // parity (all adjacent sums even) or flips parity on every step
        // (all adjacent sums odd). Those are exactly four target shapes --
        // all-even, all-odd, alternating from even, alternating from odd.
        // For each shape sweep nums once keeping its next wanted parity
        // and take the earliest match, which never forgoes a later slot.
        let mut best = 0;
        for start in 0..=1 {
            for alternate in [false, true] {
                let mut want = start;
                let mut length = 0_i32;
                for value in &nums {
                    if (value & 1) == want {
                        length += 1;
                        if alternate {
                            want ^= 1;
                        }
                    }
                }
                best = best.max(length);
            }
        }
        best
    }
}
