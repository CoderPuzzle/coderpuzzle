from typing import List


class Solution:
    def minimumOperations(self, nums: List[int]) -> int:
        # Suffixes of a distinct array stay distinct, so the surviving tail
        # is nums[j:] for the smallest j whose suffix is duplicate-free.
        # Scanning right-to-left, that j is one past the first value that
        # repeats inside the tail; each operation removes 3 front elements.
        seen = set()
        j = 0
        for i in range(len(nums) - 1, -1, -1):
            if nums[i] in seen:
                j = i + 1
                break
            seen.add(nums[i])
        return (j + 2) // 3
