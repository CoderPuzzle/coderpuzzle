from math import isqrt
from typing import List


class Solution:
    def maximumGroups(self, grades: List[int]) -> int:
        n = len(grades)
        return (isqrt(8 * n + 1) - 1) // 2
