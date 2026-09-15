from typing import List, Optional


class Solution:
    def maxScore(self, nums1: List[int], nums2: List[int], k: int) -> int:
        # Bounds: n, m <= 100 and |values| <= 10^6, so each product is at
        # most 10^12 in absolute value and the k <= 100-term total at most
        # 10^14 — exact in Python's integers.
        n, m = len(nums1), len(nums2)
        # dp layer t over prefix lengths (a, b): the best score of exactly t
        # pairs inside nums1[:a] x nums2[:b]. Layer 0 is identically 0, and
        # layer t only has feasible cells at a >= t, b >= t (fewer than t
        # elements cannot host t pairs); every prev[a-1][b-1] read at such a
        # cell lies inside layer t-1's feasible rectangle, so no sentinel is
        # ever needed.
        prev = [[0] * (m + 1) for _ in range(n + 1)]
        cur = [[0] * (m + 1) for _ in range(n + 1)]
        for t in range(1, k + 1):
            for a in range(t, n + 1):
                row, up, prow, x = cur[a], cur[a - 1], prev[a - 1], nums1[a - 1]
                for b in range(t, m + 1):
                    best = prow[b - 1] + x * nums2[b - 1]
                    if a > t and up[b] > best:
                        best = up[b]
                    if b > t and row[b - 1] > best:
                        best = row[b - 1]
                    row[b] = best
            prev, cur = cur, prev
        return prev[n][m]
