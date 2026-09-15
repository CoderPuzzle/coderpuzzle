from typing import List, Optional


class Solution:
    def mctFromLeafValues(self, arr: List[int]) -> int:
        n = len(arr)
        # dp[i][j] = min sum of non-leaf nodes for subarray arr[i..j]
        dp = [[0] * n for _ in range(n)]
        # maxi[i][j] = max leaf value in arr[i..j]
        maxi = [[0] * n for _ in range(n)]
        for i in range(n):
            maxi[i][i] = arr[i]
        for length in range(2, n + 1):
            for i in range(n - length + 1):
                j = i + length - 1
                maxi[i][j] = max(maxi[i][j - 1], arr[j])
        for length in range(2, n + 1):
            for i in range(n - length + 1):
                j = i + length - 1
                best = None
                for k in range(i, j):
                    cost = maxi[i][k] * maxi[k + 1][j] + dp[i][k] + dp[k + 1][j]
                    if best is None or cost < best:
                        best = cost
                dp[i][j] = best
        return dp[0][n - 1]
