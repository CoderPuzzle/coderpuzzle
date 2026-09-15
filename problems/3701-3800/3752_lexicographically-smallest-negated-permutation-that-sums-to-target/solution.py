from typing import List


class Solution:
    def lexSmallestNegatedPerm(self, n: int, target: int) -> List[int]:
        # The all-positive baseline [1, 2, ..., n] sums to S. Negating x
        # lowers the sum by 2 * x, so target is reachable exactly when it
        # lies in [-S, S] with the same parity as S.
        total = n * (n + 1) // 2
        if target < -total or target > total or (total - target) % 2 != 0:
            return []
        deficit = (total - target) // 2
        negated = set()
        # Greedily negate the largest values first; this is what puts the
        # most negative element at the front of the answer.
        for value in range(n, 0, -1):
            if value <= deficit:
                negated.add(value)
                deficit -= value
        return [-v for v in range(n, 0, -1) if v in negated] + [v for v in range(1, n + 1) if v not in negated]
