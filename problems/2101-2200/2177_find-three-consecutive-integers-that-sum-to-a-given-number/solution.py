from typing import List


class Solution:
    def sumOfThree(self, num: int) -> List[int]:
        # Three consecutive integers x-1, x, x+1 sum to exactly 3x, so a
        # triple exists iff num is a multiple of 3.
        if num % 3 != 0:
            return []
        mid = num // 3
        return [mid - 1, mid, mid + 1]
