from typing import List


class Solution:
    def minimumLines(self, points: List[List[int]]) -> int:
        # At most 10 points, so the set of covered points fits in a bitmask:
        # dp[covered] = fewest lines covering exactly that subset. In each
        # state the lowest uncovered point i is covered by the next line, so
        # trying i alone and every line through i and one more uncovered
        # point j exhausts every option.
        n = len(points)
        full = (1 << n) - 1
        # line_mask[i][j] = all points on the straight line through i and j;
        # the cross-product comparison tests collinearity on integers.
        line_mask = [[0] * n for _ in range(n)]
        for i in range(n):
            for j in range(n):
                if i == j:
                    continue
                dx1 = points[j][0] - points[i][0]
                dy1 = points[j][1] - points[i][1]
                mask = (1 << i) | (1 << j)
                for k in range(n):
                    dx2 = points[k][0] - points[i][0]
                    dy2 = points[k][1] - points[i][1]
                    if k != i and k != j and dx1 * dy2 == dy1 * dx2:
                        mask |= 1 << k
                line_mask[i][j] = mask
        unreachable = n + 1
        dp = [unreachable] * (full + 1)
        dp[0] = 0
        for covered in range(full):
            if dp[covered] == unreachable:
                continue
            i = 0
            while covered & (1 << i):
                i += 1
            nxt = covered | (1 << i)
            if dp[covered] + 1 < dp[nxt]:
                dp[nxt] = dp[covered] + 1
            for j in range(n):
                if j == i or covered & (1 << j):
                    continue
                nxt = covered | line_mask[i][j]
                if dp[covered] + 1 < dp[nxt]:
                    dp[nxt] = dp[covered] + 1
        return dp[full]
