impl Solution {
    pub fn single_number(nums: Vec<i32>) -> Vec<i32> {
        // XOR of the whole array: every value appearing twice cancels to
        // zero, so total is the XOR of exactly the two singles.
        let mut total = 0;
        for &value in &nums {
            total ^= value;
        }
        // total is nonzero (the singles are distinct); each set bit marks a
        // position where they differ. Isolate the lowest one: the wrapping
        // two's-complement negation keeps that bit and flips all lower
        // bits, so the AND leaves exactly it.
        let mask = total & total.wrapping_neg();
        // XOR only the values with that bit set. Duplicate pairs land in the
        // same group and cancel again; the singles differ at that bit, so
        // exactly one of them is here — leaving first as that single.
        let mut first = 0;
        for &value in &nums {
            if value & mask != 0 {
                first ^= value;
            }
        }
        // total was the XOR of both singles, so the other falls out for free.
        let second = total ^ first;
        // Branching only normalizes the output order.
        if first > second {
            vec![second, first]
        } else {
            vec![first, second]
        }
    }
}
