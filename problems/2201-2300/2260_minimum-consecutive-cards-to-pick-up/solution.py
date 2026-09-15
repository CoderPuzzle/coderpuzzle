from collections import defaultdict


class Solution:
    def minimumCardPickup(self, cards: List[int]) -> int:
        last = {}
        best = float("inf")
        for i, v in enumerate(cards):
            if v in last and i - last[v] + 1 < best:
                best = i - last[v] + 1
            last[v] = i
        return -1 if best == float("inf") else best
