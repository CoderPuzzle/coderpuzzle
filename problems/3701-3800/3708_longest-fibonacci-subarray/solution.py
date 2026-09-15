from typing import List


class Solution:
    def longestSubarray(self, nums: List[int]) -> int:
        # One sweep carrying a run counter: any adjacent pair is a valid
        # Fibonacci array, so runs start at length 2; each later element
        # extends the run when it equals the sum of the two before it and
        # snaps the counter back to 2 when it does not.
        best = 2
        current = 2
        for i in range(2, len(nums)):
            if nums[i] == nums[i - 1] + nums[i - 2]:
                current += 1
            else:
                current = 2
            if current > best:
                best = current
        return best
