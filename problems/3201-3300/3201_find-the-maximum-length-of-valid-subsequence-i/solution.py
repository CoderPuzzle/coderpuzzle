from typing import List


class Solution:
    def maximumLength(self, nums: List[int]) -> int:
        # Only parities matter: a valid subsequence either never changes
        # parity (all adjacent sums even) or flips parity on every step
        # (all adjacent sums odd). Those are exactly four target shapes --
        # all-even, all-odd, alternating from even, alternating from odd.
        # For each shape sweep nums once keeping its next wanted parity and
        # taking the earliest match, which never forgoes a later slot. With
        # lengths below 2 * 10^5 nothing approaches 32 bits.
        best = 0
        for start in (0, 1):
            for alternate in (False, True):
                want = start
                length = 0
                for value in nums:
                    if value % 2 == want:
                        length += 1
                        if alternate:
                            want ^= 1
                best = max(best, length)
        return best
