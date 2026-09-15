from typing import List


class Solution:
    def averageValue(self, nums: List[int]) -> int:
        # Divisible by 2 and by 3 means divisible by 6 (hint 2). Sum the
        # multiples of 6, count them, and floor-divide; with none present
        # return 0 as the statement asks.
        total = 0
        count = 0
        for value in nums:
            if value % 6 == 0:
                total += value
                count += 1
        return total // count if count else 0
