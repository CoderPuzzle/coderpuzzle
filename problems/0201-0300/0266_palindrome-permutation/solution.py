class Solution:
    def canPermutePalindrome(self, s: str) -> bool:
        # A permutation rearranges into a palindrome exactly when at most one
        # character occurs an odd number of times: pairs supply the mirrored
        # halves, a lone survivor can stand in the middle.
        odd_mask = 0
        for ch in s:
            # One bit per letter, flipped per occurrence: set bits after the
            # pass are exactly the odd counts.
            odd_mask ^= 1 << (ord(ch) - ord("a"))
        # mask & (mask - 1) clears the lowest set bit, so it is zero exactly
        # when at most one bit — at most one odd count — remains.
        return odd_mask & (odd_mask - 1) == 0
