from typing import List


class Solution:
    def goodSubsetofBinaryMatrix(self, grid: List[List[int]]) -> List[int]:
        # Each row collapses into an n-bit signature (n <= 5 means at most
        # 32 of them). An all-zero row by itself is a good subset; otherwise
        # the earliest previously stored signature disjoint from the current
        # row completes a size-2 good subset.
        seen = {}
        for i, row in enumerate(grid):
            mask = 0
            for j, value in enumerate(row):
                if value == 1:
                    mask |= 1 << j
            if mask == 0:
                return [i]
            for other in range(32):
                if other in seen and (other & mask) == 0:
                    return [seen[other], i]
            if mask not in seen:
                seen[mask] = i
        return []
