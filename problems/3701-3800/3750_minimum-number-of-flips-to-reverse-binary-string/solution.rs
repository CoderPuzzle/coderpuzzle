impl Solution {
    pub fn minimum_flips(n: i32) -> i32 {
        // The binary form without leading zeros.
        let s = format!("{:b}", n);
        let bytes = s.as_bytes();
        // Walk inward from both ends. When the two bits of a pair differ,
        // each end sits on a position whose required bit is the opposite
        // end's bit, so the pair pays exactly two flips.
        let mut flips = 0i32;
        let (mut left, mut right) = (0usize, bytes.len() - 1);
        while left < right {
            if bytes[left] != bytes[right] {
                flips += 2;
            }
            left += 1;
            right -= 1;
        }
        flips
    }
}
