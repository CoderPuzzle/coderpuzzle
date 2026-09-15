from typing import List, Optional


class Solution:
    def specialArray(self, nums: List[int]) -> int:
        # Sort descending: for candidate x = i, the i-th largest element
        # must still be >= i while the next one drops below it (or i is
        # the last position), which is exactly "i elements are >= i".
        nums_sorted = sorted(nums, reverse=True)
        n = len(nums_sorted)
        for i in range(1, n + 1):
            if nums_sorted[i - 1] >= i and (i == n or nums_sorted[i] < i):
                return i
        # Every element is non-negative, so x = 0 would need an empty
        # array; nothing else worked, so the array is not special.
        return -1
