from typing import List


class Solution:
    def findLengthOfLCIS(self, nums: List[int]) -> int:
        # Single pass with a run counter: a strict rise extends the
        # increasing run under the cursor, anything else restarts it at 1.
        run = 1
        best = 1
        for i in range(1, len(nums)):
            if nums[i] > nums[i - 1]:
                run += 1
                # A run only reaches its full length at its last element,
                # so tracking the best while it grows misses nothing.
                best = max(best, run)
            else:
                run = 1
        return best
