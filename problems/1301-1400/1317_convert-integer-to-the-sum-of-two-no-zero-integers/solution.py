from typing import List


class Solution:
    def getNoZeroIntegers(self, n: int) -> List[int]:
        # Smallest-a decomposition: arithmetic digit test, no strings.
        def no_zero(x: int) -> bool:
            while x > 0:
                if x % 10 == 0:
                    return False
                x //= 10
            return True

        for a in range(1, n):
            if no_zero(a) and no_zero(n - a):
                return [a, n - a]
        return []
