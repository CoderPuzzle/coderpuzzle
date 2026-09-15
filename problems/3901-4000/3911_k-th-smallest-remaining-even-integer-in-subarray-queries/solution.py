from bisect import bisect_left, bisect_right
from typing import List


class Solution:
    def kthRemainingInteger(self, nums: List[int], queries: List[List[int]]) -> List[int]:
        positions = []
        adjusted = []
        for index, value in enumerate(nums):
            if value % 2 == 0:
                removed_index = len(positions)
                positions.append(index)
                adjusted.append(value // 2 - removed_index)

        result = []
        for left, right, k in queries:
            first = bisect_left(positions, left)
            last = bisect_right(positions, right)
            crossed = bisect_right(adjusted, k - first, first, last) - first
            result.append(2 * (k + crossed))
        return result
