from typing import List


class Solution:
    def findMaxConsecutiveOnes(self, nums: List[int]) -> int:
        # One pass with a running count: a 1 extends the current run of
        # ones, a 0 ends it and resets the count to zero.
        count = 0
        best = 0
        for value in nums:
            if value == 1:
                count += 1
                # A run only reaches its full length at its last 1, so
                # tracking the best while it grows misses nothing.
                best = max(best, count)
            else:
                count = 0
        return best
