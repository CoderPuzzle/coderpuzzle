from typing import List, Optional


class Solution:
    def maxValueOfCoins(self, piles: List[List[int]], k: int) -> int:
        # dp[j]: best value using exactly j coins from the piles seen so far
        dp = [0] * (k + 1)
        for pile in piles:
            # taking t coins from a pile means its top t: prefix[t]
            prefix = [0]
            for coin in pile:
                prefix.append(prefix[-1] + coin)
            # t stays within both the pile's size and the budget
            take_max = min(len(pile), k)
            # fresh row so transitions only read the previous pile's dp
            ndp = [0] * (k + 1)
            for j in range(k + 1):
                # t = 0 case: skip this pile entirely
                value = dp[j]
                for t in range(1, min(take_max, j) + 1):
                    cand = dp[j - t] + prefix[t]
                    if cand > value:
                        value = cand
                ndp[j] = value
            dp = ndp
        # coin values are positive, so using all k coins is never worse
        return dp[k]
