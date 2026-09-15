from typing import List, Optional


class Solution:
    def canMakeArithmeticProgression(self, arr: List[int]) -> bool:
        # Sorting produces the one arrangement that could possibly be a
        # valid progression; check its consecutive gaps are all equal.
        a = sorted(arr)
        diff = a[1] - a[0]
        for i in range(2, len(a)):
            if a[i] - a[i - 1] != diff:
                return False
        return True
