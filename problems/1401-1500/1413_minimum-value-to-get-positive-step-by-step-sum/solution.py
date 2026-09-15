from typing import List


class Solution:
    def minStartValue(self, nums: List[int]) -> int:
        min_prefix = 0
        prefix = 0
        for x in nums:
            prefix += x
            if prefix < min_prefix:
                min_prefix = prefix
        return max(1, 1 - min_prefix)
