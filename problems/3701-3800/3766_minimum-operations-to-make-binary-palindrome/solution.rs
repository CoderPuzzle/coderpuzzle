impl Solution {
    pub fn min_operations(nums: Vec<i32>) -> Vec<i32> {
        // The definition, read literally: widen the offset d = 0, 1, 2,
        // ... and stop at the first d where either neighbor is a binary
        // palindrome; that first hit costs exactly d operations and no
        // palindrome can be closer.
        nums.into_iter()
            .map(|value| {
                let mut d = 0;
                loop {
                    // the down side floors at 1: values below have no
                    // binary form without leading zeros
                    if value - d >= 1 && palindrome(value - d) {
                        break;
                    }
                    if palindrome(value + d) {
                        break;
                    }
                    d += 1;
                }
                d
            })
            .collect()
    }
}

fn palindrome(value: i32) -> bool {
    // The binary form without leading zeros.
    let bits = format!("{:b}", value);
    let bytes = bits.as_bytes();
    let (mut left, mut right) = (0usize, bytes.len() - 1);
    while left < right {
        if bytes[left] != bytes[right] {
            return false;
        }
        left += 1;
        right -= 1;
    }
    true
}
