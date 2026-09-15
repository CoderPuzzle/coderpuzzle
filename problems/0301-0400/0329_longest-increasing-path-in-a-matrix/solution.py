from typing import List, Optional


class Solution:
    def longestIncreasingPath(self, matrix: List[List[int]]) -> int:
        if not matrix or not matrix[0]:
            return 0
        m = len(matrix)
        n = len(matrix[0])
        # Strictly increasing paths make the cells a DAG (edges point to
        # larger neighbors), so ascending value order is a topological order.
        cells = sorted((matrix[i][j], i, j) for i in range(m) for j in range(n))
        # dp[i][j] = longest increasing path starting at (i, j); 1 = cell alone.
        dp = [[1] * n for _ in range(m)]
        best = 1
        for _, i, j in cells:
            # Smaller neighbors appear earlier in the sort, so their dp is final.
            for di, dj in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                ni, nj = i + di, j + dj
                # Strict < so equal-valued neighbors never link.
                if 0 <= ni < m and 0 <= nj < n and matrix[ni][nj] < matrix[i][j]:
                    if dp[ni][nj] + 1 > dp[i][j]:
                        dp[i][j] = dp[ni][nj] + 1
            if dp[i][j] > best:
                best = dp[i][j]
        return best
