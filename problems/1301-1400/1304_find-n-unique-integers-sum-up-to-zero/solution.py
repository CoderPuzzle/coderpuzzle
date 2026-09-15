from typing import List


class Solution:
    def sumZero(self, n: int) -> List[int]:
        # Pair every positive value 1..n//2 with its negative twin; an odd n
        # additionally carries a single 0 in the center. Every pair cancels,
        # so the array sums to zero and holds n distinct values.
        half = n // 2
        if n % 2 == 1:
            return list(range(-half, 0)) + [0] + list(range(1, half + 1))
        return list(range(-half, 0)) + list(range(1, half + 1))
