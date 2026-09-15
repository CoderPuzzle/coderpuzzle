from typing import List


class Solution:
    def minimumCoins(self, prices: List[int]) -> int:
        # dp[i] = cheapest way to acquire everything from fruit i onward
        # when fruit i itself is purchased. Buying fruit i makes fruits
        # i+1..2i+1 free, so if that reaches the end dp[i] = prices[i];
        # otherwise the next purchase lands on some j in [i+1, 2i+2] and
        # dp[i] = prices[i] + min(dp[j]). Sweeping i right to left, that
        # window's edges only move left, so a monotonic window supplies
        # the minimum in O(1): win holds candidate indices, oldest first,
        # with dp values non-decreasing toward the newest.
        n = len(prices)
        dp = [0] * n
        win: List[int] = []
        head = 0
        for i in range(n - 1, -1, -1):
            j = i + 1
            if j < n:
                while len(win) > head and dp[win[-1]] > dp[j]:
                    win.pop()
                win.append(j)
            while head < len(win) and win[head] > 2 * i + 2:
                head += 1
            if 2 * i + 1 >= n - 1:
                dp[i] = prices[i]
            else:
                dp[i] = prices[i] + dp[win[head]]
        return dp[0]
