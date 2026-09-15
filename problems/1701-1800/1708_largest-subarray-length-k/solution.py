from typing import List


class Solution:
    def largestSubarray(self, nums: List[int], k: int) -> List[int]:
        # Distinct values mean two length-k windows never tie: their first
        # elements differ, and the comparison is decided at index 0 by that
        # pair alone. The answer is therefore the window starting at the
        # maximum of nums[0..n-k] — one scan for that position, then take
        # the k elements from it.
        best = 0
        for i in range(1, len(nums) - k + 1):
            if nums[i] > nums[best]:
                best = i
        return nums[best : best + k]
