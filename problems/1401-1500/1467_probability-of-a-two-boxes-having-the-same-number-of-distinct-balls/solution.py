from math import comb
from typing import List


class Solution:
    def getProbability(self, balls: List[int]) -> float:
        total = sum(balls)
        half = total // 2
        k = len(balls)
        denominator = comb(total, half)

        def walk(index: int, remaining: int, distinct1: int, distinct2: int) -> int:
            # Sum of per-color binomial products over the completions whose
            # two boxes end with equal distinct-color counts.
            if index == k:
                return 1 if remaining == 0 and distinct1 == distinct2 else 0
            count = balls[index]
            ways = 0
            for x in range(min(count, remaining) + 1):
                ways += comb(count, x) * walk(
                    index + 1,
                    remaining - x,
                    distinct1 + (1 if x > 0 else 0),
                    distinct2 + (1 if x < count else 0),
                )
            return ways

        return walk(0, half, 0, 0) / denominator
