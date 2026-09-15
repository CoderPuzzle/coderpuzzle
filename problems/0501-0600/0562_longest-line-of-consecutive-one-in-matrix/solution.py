from typing import List


class Solution:
    def longestLine(self, mat: List[List[int]]) -> int:
        # Scan row by row; prev[j] holds the four run lengths that end at
        # cell (i - 1, j): horizontal, vertical, diagonal, anti-diagonal.
        m, n = len(mat), len(mat[0])
        prev: List[List[int]] = [[0, 0, 0, 0] for _ in range(n)]
        best = 0
        for i in range(m):
            cur: List[List[int]] = [[0, 0, 0, 0] for _ in range(n)]
            for j in range(n):
                if mat[i][j] == 1:
                    # Horizontal: extend the run arriving from the left.
                    cur[j][0] = (cur[j - 1][0] if j > 0 else 0) + 1
                    # Vertical: extend the run arriving from above.
                    cur[j][1] = prev[j][1] + 1
                    # Diagonal: extend the run arriving from up-left.
                    cur[j][2] = (prev[j - 1][2] if j > 0 else 0) + 1
                    # Anti-diagonal: extend the run arriving from up-right.
                    cur[j][3] = (prev[j + 1][3] if j + 1 < n else 0) + 1
                    best = max(best, cur[j][0], cur[j][1], cur[j][2], cur[j][3])
            prev = cur
        return best
