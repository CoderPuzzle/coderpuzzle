from typing import List


class Solution:
    def zeroFilledSubarray(self, nums: List[int]) -> int:
        # Every zero-filled subarray ends at exactly one index, and the ones
        # ending at index i are precisely those reaching back over the run of
        # consecutive zeros through i — one for each possible start. Adding
        # the current run length at every zero therefore counts each subarray
        # exactly once; totals reach ~5e9, past 32-bit range.
        total = 0
        run = 0
        for value in nums:
            if value == 0:
                run += 1
                total += run
            else:
                run = 0
        return total
