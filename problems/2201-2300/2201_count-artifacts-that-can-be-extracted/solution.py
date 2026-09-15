from typing import List


class Solution:
    def digArtifacts(self, n: int, artifacts: List[List[int]], dig: List[List[int]]) -> int:
        # Mark every excavated cell once in a boolean grid, then each
        # rectangle test is a constant-time lookup per cell — dig is never
        # rescanned for an artifact.
        dug = [[False] * n for _ in range(n)]
        for r, c in dig:
            dug[r][c] = True
        extracted = 0
        for r1, c1, r2, c2 in artifacts:
            if all(dug[r][c] for r in range(r1, r2 + 1) for c in range(c1, c2 + 1)):
                extracted += 1
        return extracted
