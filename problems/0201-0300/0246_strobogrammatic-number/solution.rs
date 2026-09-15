use std::collections::HashMap;

impl Solution {
    pub fn is_strobogrammatic(num: String) -> bool {
        // A 180-degree turn reverses digit order and rotates each digit, and
        // only 0, 1, 8 (to themselves) and 6, 9 (to each other) survive it.
        let rotated = HashMap::from([(b'0', b'0'), (b'1', b'1'), (b'8', b'8'), (b'6', b'9'), (b'9', b'6')]);
        let digits = num.as_bytes();
        let mut left = 0;
        let mut right = digits.len() - 1;
        while left < right {
            // Each digit must be the rotation of the digit standing opposite.
            match rotated.get(&digits[left]) {
                Some(&turn) if turn == digits[right] => {}
                _ => return false,
            }
            left += 1;
            right -= 1;
        }
        // An odd length leaves the pointers met on the middle digit, which
        // pairs with itself: it must rotate to itself, so 6 and 9 fail there
        // like a digit that does not rotate at all. An even length leaves
        // them crossed, with every mirrored pair already checked.
        left != right || matches!(digits[left], b'0' | b'1' | b'8')
    }
}
