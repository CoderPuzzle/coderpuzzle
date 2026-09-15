from typing import List


class Solution:
    def divideArray(self, nums: List[int]) -> bool:
        # Values are bounded to [1, 500], so a fixed counting table answers
        # "is every value's occurrence count even?" in one pass.
        counts = [0] * 501
        for value in nums:
            counts[value] += 1
        return all(count % 2 == 0 for count in counts)
