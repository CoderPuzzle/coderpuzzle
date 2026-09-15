from typing import List, Optional


class Solution:
    def maxContainers(self, n: int, w: int, maxWeight: int) -> int:
        # Two ceilings bound the load independently: the deck offers n*n
        # cells, and the weight budget fits maxWeight // w containers of
        # uniform weight w. Any count up to the smaller one is realizable,
        # so the answer is that minimum. Every value stays at or below
        # 10^9 — well inside 32-bit range.
        return min(n * n, maxWeight // w)
