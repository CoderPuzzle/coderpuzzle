from typing import List, Optional


class Solution:
    def getSumAbsoluteDifferences(self, nums: List[int]) -> List[int]:
        n = len(nums)
        total = sum(nums)
        prefix = 0
        result = []
        for i, x in enumerate(nums):
            # Sorted order dissolves the absolute values: every element left
            # of i is <= x and every element right of i is >= x, so each side
            # collapses into one signed sum.
            # Left part: x*i - prefix, the sum of the first i elements.
            left = x * i - prefix
            suffix = total - prefix - x
            # Right part: suffix sum - x*(n - i - 1).
            right = suffix - x * (n - i - 1)
            # Ties are exact — equal values contribute 0 on either side.
            result.append(left + right)
            prefix += x
        return result
