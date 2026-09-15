from typing import Dict, List


class Solution:
    def findDiagonalOrder(self, nums: List[List[int]]) -> List[int]:
        buckets: Dict[int, List[int]] = {}
        for i, row in enumerate(nums):
            for j, value in enumerate(row):
                buckets.setdefault(i + j, []).append(value)
        result: List[int] = []
        for key in sorted(buckets):
            result.extend(reversed(buckets[key]))
        return result
