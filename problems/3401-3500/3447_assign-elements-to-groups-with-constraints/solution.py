from typing import List


class Solution:
    def assignElements(self, groups: List[int], elements: List[int]) -> List[int]:
        # Sieve from the smallest element index: the first occurrence of each
        # value claims every multiple it divides, so each group size reads off
        # the earliest qualifying element index.
        limit = 100_001
        best = [-1] * limit
        seen = [False] * limit
        for index, value in enumerate(elements):
            if seen[value]:
                continue
            seen[value] = True
            for multiple in range(value, limit, value):
                if best[multiple] == -1:
                    best[multiple] = index
        return [best[size] for size in groups]
