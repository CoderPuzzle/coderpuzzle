impl Solution {
    pub fn can_permute_palindrome(s: String) -> bool {
        // A permutation rearranges into a palindrome exactly when at most one
        // character occurs an odd number of times: pairs supply the mirrored
        // halves, a lone survivor can stand in the middle.
        let mut odd_mask = 0u32;
        for ch in s.bytes() {
            // One bit per letter, flipped per occurrence: set bits after the
            // pass are exactly the odd counts.
            odd_mask ^= 1 << (ch - b'a');
        }
        // mask & (mask - 1) clears the lowest set bit, so it is zero exactly
        // when at most one bit — at most one odd count — remains.
        odd_mask & (odd_mask - 1) == 0
    }
}
