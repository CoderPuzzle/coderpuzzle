from typing import List, Optional
from collections import deque


class Solution:
    def minimumCoins(self, prices: List[int]) -> int:
        n = len(prices)
        dp = [0] * (n + 1)
        dq = deque()

        def value(l):
            return dp[l - 1] + prices[l - 1]

        for i in range(1, n + 1):
            while dq and value(dq[-1]) >= value(i):
                dq.pop()
            dq.append(i)
            lo = (i + 1) // 2  # ceil(i / 2)
            while dq and dq[0] < lo:
                dq.popleft()
            dp[i] = value(dq[0])
        return dp[n]
