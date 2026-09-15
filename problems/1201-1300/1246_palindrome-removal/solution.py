from typing import List, Optional


class Solution:
    def minimumMoves(self, arr: List[int]) -> int:
        n = len(arr)
        if n == 0:
            return 0

        # dp[i][j] = min moves to erase arr[i..j]; removals concatenate the
        # surviving parts, so the cost depends only on the subarray's contents.
        dp = [[0] * n for _ in range(n)]
        for i in range(n):
            dp[i][i] = 1
        for i in range(n - 1):
            dp[i][i + 1] = 1 if arr[i] == arr[i + 1] else 2

        # Fill by increasing length so every referenced subinterval is final.
        for length in range(3, n + 1):
            for i in range(n - length + 1):
                j = i + length - 1
                # Upper bound: shed the first element in some move.
                best = 1 + dp[i + 1][j]
                # Split: the two halves can be cleared independently —
                # removals never mix across a boundary both sides respect.
                for k in range(i, j):
                    candidate = dp[i][k] + dp[k + 1][j]
                    if candidate < best:
                        best = candidate
                if arr[i] == arr[j]:
                    # Equal ends may share one move deferred to the last turn:
                    # clear the interior first, then remove the pair together.
                    # Peeling a matched pair never breaks palindromes, so it
                    # costs nothing extra.
                    interior = dp[i + 1][j - 1]
                    if interior < best:
                        best = interior
                dp[i][j] = best

        return dp[0][n - 1]
