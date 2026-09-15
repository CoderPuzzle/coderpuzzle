from typing import List


class Solution:
    def largestUniqueNumber(self, nums: List[int]) -> int:
        counts = [0] * 1001
        for value in nums:
            counts[value] += 1
        # Walk downward so the first singleton found is the largest.
        for value in range(1000, -1, -1):
            if counts[value] == 1:
                return value
        return -1
