from typing import List


class Solution:
    def sumOfMultiples(self, n: int) -> int:
        # Straight scan over [1, n]: anything divisible by 3, 5, or 7
        # contributes once — numbers divisible by two of them (say 15) or
        # all three (105) still count a single time, which the `or`
        # handles without any inclusion-exclusion bookkeeping.
        total = 0
        for value in range(1, n + 1):
            if value % 3 == 0 or value % 5 == 0 or value % 7 == 0:
                total += value
        return total
