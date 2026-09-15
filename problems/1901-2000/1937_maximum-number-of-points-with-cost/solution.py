from typing import List, Optional


class Solution:
    def maxPoints(self, points: List[List[int]]) -> int:
        m = len(points)
        n = len(points[0])
        # dp[c] = best score with the current row's pick at column c; the
        # first row seeds it with its own point values.
        prev = [points[0][c] for c in range(n)]
        for r in range(1, m):
            # Split |p - c| by direction: from the left the carry-over is
            # dp[p] + p - c, so a running max of dp[p] + p replaces the
            # quadratic predecessor rescan.
            left = [0] * n
            best = prev[0] + 0
            for c in range(n):
                if prev[c] + c > best:
                    best = prev[c] + c
                left[c] = best
            # Mirror sweep from the right: running max of dp[p] - p, p >= c.
            right = [0] * n
            best = prev[n - 1] - (n - 1)
            for c in range(n - 1, -1, -1):
                if prev[c] - c > best:
                    best = prev[c] - c
                right[c] = best
            # Both directions cover p == c (zero penalty), so every
            # predecessor is considered under the correct penalty sign.
            prev = [points[r][c] + max(left[c] - c, right[c] + c) for c in range(n)]
        return max(prev)
