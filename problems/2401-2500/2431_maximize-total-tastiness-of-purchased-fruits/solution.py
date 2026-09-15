from typing import List


class Solution:
    def maxTastiness(self, price: List[int], tastiness: List[int], maxAmount: int, maxCoupons: int) -> int:
        # dp[a][c] = best tastiness having spent `a` and used `c` coupons.
        # Descending both axes keeps each fruit usable at most once: every
        # update lands at a larger amount or a larger coupon count, which
        # the descending sweep has already passed.
        dp = [[-1] * (maxCoupons + 1) for _ in range(maxAmount + 1)]
        dp[0][0] = 0
        for p, t in zip(price, tastiness):
            half = p // 2
            for a in range(maxAmount, -1, -1):
                row = dp[a]
                for c in range(maxCoupons, -1, -1):
                    cur = row[c]
                    if cur < 0:
                        continue
                    if a + p <= maxAmount:
                        nxt = cur + t
                        if nxt > dp[a + p][c]:
                            dp[a + p][c] = nxt
                    if c + 1 <= maxCoupons and a + half <= maxAmount:
                        nxt = cur + t
                        if nxt > dp[a + half][c + 1]:
                            dp[a + half][c + 1] = nxt
        return max(max(row) for row in dp)
