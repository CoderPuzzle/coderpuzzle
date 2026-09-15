from typing import List


class Solution:
    def increasingTriplet(self, nums: List[int]) -> bool:
        first = float("inf")
        second = float("inf")
        for value in nums:
            if value <= first:
                first = value
            elif value <= second:
                second = value
            else:
                return True
        return False
