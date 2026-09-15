from typing import List, Optional


class Solution:
    def maximalSquare(self, matrix: List[List[str]]) -> int:
        m = len(matrix)
        n = len(matrix[0])
        best = 0
        # Two rolling rows of length n + 1: dp[i][j] is the side of the
        # largest all-ones square ending at (i, j); the leading zero column
        # stands in for the out-of-bounds left border.
        prev = [0] * (n + 1)
        for i in range(m):
            curr = [0] * (n + 1)
            for j in range(n):
                if matrix[i][j] == "1":
                    # A square growing out of this corner must fit inside all
                    # three predecessors: up, left, and diagonal — so the
                    # minimum is the binding constraint.
                    curr[j + 1] = min(prev[j], prev[j + 1], curr[j]) + 1
                    best = max(best, curr[j + 1])
            prev = curr
        return best * best
