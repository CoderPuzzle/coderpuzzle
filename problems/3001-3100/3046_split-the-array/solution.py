from typing import List


class Solution:
    def isPossibleToSplit(self, nums: List[int]) -> bool:
        frequencies = {}
        for num in nums:
            if frequencies.get(num, 0) == 2:
                return False
            frequencies[num] = frequencies.get(num, 0) + 1
        return True
