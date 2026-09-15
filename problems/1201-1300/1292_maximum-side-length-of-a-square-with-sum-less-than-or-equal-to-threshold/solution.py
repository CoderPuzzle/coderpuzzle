from typing import List, Optional


class Solution:
    def maxSideLength(self, mat: List[List[int]], threshold: int) -> int:
        m, n = len(mat), len(mat[0])
        # prefix[i][j] = sum of the rectangle from (0,0) to (i-1, j-1)
        prefix = [[0] * (n + 1) for _ in range(m + 1)]
        for i in range(m):
            row = mat[i]
            prow = prefix[i]
            crow = prefix[i + 1]
            for j in range(n):
                crow[j + 1] = crow[j] + prow[j + 1] - prow[j] + row[j]

        def square_sum(i, j, k):
            # inclusion-exclusion of four corners: any square sum in O(1)
            p = prefix
            return p[i + k][j + k] - p[i][j + k] - p[i + k][j] + p[i][j]

        # one global answer; each top-left corner only tries to extend it
        ans = 0
        for i in range(m):
            for j in range(n):
                # try side ans+1 while it fits the matrix and the threshold;
                # ans never shrinks, so failures cost a single O(1) check and
                # each side length is paid at most once across the scan
                while i + ans < m and j + ans < n and square_sum(i, j, ans + 1) <= threshold:
                    ans += 1
        return ans
