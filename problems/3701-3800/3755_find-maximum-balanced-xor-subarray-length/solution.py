from typing import List


class Solution:
    def maxBalancedSubarray(self, nums: List[int]) -> int:
        # Two prefixes pin a window down: a repeated prefix XOR cancels the
        # shared head (the window's own XOR is 0), and a repeated parity gap
        # (evens minus odds so far) means the window's even and odd counts
        # tie. Matching pairs therefore bracket a balanced, zero-XOR
        # subarray, and the earliest occurrence of each pair maximizes the
        # length read off it.
        first = {(0, 0): -1}
        pxor = 0
        gap = 0
        best = 0
        for i, value in enumerate(nums):
            pxor ^= value
            gap += 1 if value % 2 == 0 else -1
            j = first.get((pxor, gap))
            if j is None:
                first[(pxor, gap)] = i
            elif i - j > best:
                best = i - j
        return best
