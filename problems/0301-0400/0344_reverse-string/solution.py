from typing import List


class Solution:
    def reverseString(self, s: List[str]) -> List[str]:
        # Two indexes walk inward from both ends and swap each pair they
        # form: position i trades places with position n-1-i, so every
        # element crosses the middle exactly once and the array is reversed
        # when the indexes meet. The tuple assignment only trades the two
        # references — no string is ever rebuilt — so the reversal happens
        # in place with O(1) extra memory; the mutated array is the answer.
        lo, hi = 0, len(s) - 1
        while lo < hi:
            s[lo], s[hi] = s[hi], s[lo]
            lo += 1
            hi -= 1
        return s
