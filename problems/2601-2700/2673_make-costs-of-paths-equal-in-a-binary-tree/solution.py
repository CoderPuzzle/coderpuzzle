from typing import List


class Solution:
    def minIncrements(self, n: int, cost: List[int]) -> int:
        # Walk heap indices from the deepest parent up to the root. At each
        # node the two child subtrees must end on a common maximum, so their
        # difference is charged once and the larger combined maximum travels
        # up: index i's children sit at 2i and 2i + 1 in 1-based numbering.
        subtree = cost[:]
        total = 0
        for node in range(n // 2, 0, -1):
            left = subtree[2 * node - 1]
            right = subtree[2 * node]
            total += abs(left - right)
            subtree[node - 1] = max(left, right) + cost[node - 1]
        return total
