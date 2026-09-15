impl Solution {
    // XOR is self-inverse and order-free, so the whole array's XOR decides
    // everything: non-zero means take all of it.
    pub fn longest_subsequence(nums: Vec<i32>) -> i32 {
        let mut total = 0i32;
        let mut seen_nonzero = false;
        for value in &nums {
            total ^= *value;
            seen_nonzero |= *value != 0;
        }
        // A zero total is repaired by dropping one non-zero element (the rest
        // then XORs to that element); all zeros leave nothing worth taking.
        if total != 0 {
            nums.len() as i32
        } else if seen_nonzero {
            nums.len() as i32 - 1
        } else {
            0
        }
    }
}
