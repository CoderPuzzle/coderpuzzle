from typing import List, Optional


class Solution:
    def minDeletionSize(self, strs: List[str]) -> int:
        deletions = 0
        rows, cols = len(strs), len(strs[0])
        for j in range(cols):
            for i in range(1, rows):
                # A column is condemned the moment a character drops below
                # the one above it; equal characters never condemn.
                if strs[i][j] < strs[i - 1][j]:
                    deletions += 1
                    break
        return deletions
