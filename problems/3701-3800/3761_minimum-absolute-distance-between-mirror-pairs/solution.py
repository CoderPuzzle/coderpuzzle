from typing import List


class Solution:
    def minMirrorPairDistance(self, nums: List[int]) -> int:
        best = -1
        # Most recent index for each reversed value; a nearer supplier beats
        # a farther one for every future match, so older entries never
        # matter again.
        latest = {}
        for index, num in enumerate(nums):
            # Look up before recording: an index cannot pair with itself, so
            # palindromic values wait here for a genuine second occurrence.
            mirror = latest.get(num)
            if mirror is not None and (best == -1 or index - mirror < best):
                best = index - mirror
            # Reversal peels last digits off until none remain; trailing
            # zeros drop out on their own (120 -> 21, 100 -> 1).
            reversed_value = 0
            value = num
            while value > 0:
                reversed_value = reversed_value * 10 + value % 10
                value //= 10
            latest[reversed_value] = index
        return best
