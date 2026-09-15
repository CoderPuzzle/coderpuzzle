from typing import List


class Solution:
    def longestSubarray(self, nums: List[int]) -> int:
        # AND never exceeds any member, so the maximum subarray AND is
        # max(nums), and only subarrays made entirely of that value attain
        # it: adding anything smaller strictly lowers the AND. The answer
        # is therefore the longest run of consecutive occurrences of the
        # maximum.
        target = max(nums)
        best = run = 0
        for num in nums:
            if num == target:
                run += 1
                if run > best:
                    best = run
            else:
                run = 0
        return best
