class Solution:
    def minimumFlips(self, n: int) -> int:
        # The binary form without leading zeros; the target is this string
        # read backwards.
        s = bin(n)[2:]
        # Walk inward from both ends. When the two bits of a pair differ,
        # each end sits on a position whose required bit is the opposite
        # end's bit, so the pair pays exactly two flips.
        flips = 0
        left, right = 0, len(s) - 1
        while left < right:
            if s[left] != s[right]:
                flips += 2
            left += 1
            right -= 1
        return flips
