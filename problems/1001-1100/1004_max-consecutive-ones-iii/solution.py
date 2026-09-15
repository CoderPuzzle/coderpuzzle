from typing import List, Optional


class Solution:
    def longestOnes(self, nums: List[int], k: int) -> int:
        # flipping <= k zeros == longest window holding <= k zeros
        # (nothing is actually flipped)
        left = 0
        zeros = 0
        best = 0
        for right, value in enumerate(nums):
            if value == 0:
                zeros += 1
            # shrink from the left only as far as necessary — never reset —
            # so the window keeps growing across long stretches
            while zeros > k:
                if nums[left] == 0:
                    zeros -= 1
                left += 1
            # after the shrink this is the longest valid window ending at
            # right; each index enters and leaves the window at most once
            if right - left + 1 > best:
                best = right - left + 1
        return best
