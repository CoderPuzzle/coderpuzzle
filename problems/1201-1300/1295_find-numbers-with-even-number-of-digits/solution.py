from typing import List


class Solution:
    def findNumbers(self, nums: List[int]) -> int:
        # Each division by 10 sheds one digit; the step count is the digit
        # count. Even tallies are what we count.
        even = 0
        for value in nums:
            digits = 0
            while value > 0:
                value //= 10
                digits += 1
            if digits % 2 == 0:
                even += 1
        return even
