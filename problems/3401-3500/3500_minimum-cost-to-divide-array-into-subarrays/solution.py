from typing import List, Optional


class Solution:
    def minimumCost(self, nums: List[int], cost: List[int], k: int) -> int:
        n = len(nums)
        pref_nums = [0] * (n + 1)
        pref_cost = [0] * (n + 1)
        for i in range(n):
            pref_nums[i + 1] = pref_nums[i] + nums[i]
            pref_cost[i + 1] = pref_cost[i] + cost[i]

        INF = 10**30
        # dp[i] = min cost to partition the suffix nums[i:]; empty suffix is free.
        dp = [INF] * (n + 1)
        dp[n] = 0
        total_cost = pref_cost[n]
        # Right-to-left so every suffix value dp[j+1] is ready when needed.
        for i in range(n - 1, -1, -1):
            best = INF
            # Take [i, j] as the first block. The k*index term telescopes: each
            # block is charged k * (cost mass from i to the array's end), a
            # self-contained penalty independent of later split choices.
            for j in range(i, n):
                # pref_nums[j+1] is the whole-array prefix through j, matching the
                # nums[0..r] factor of the formula, not the block's own sum.
                seg = pref_nums[j + 1] * (pref_cost[j + 1] - pref_cost[i])
                seg += k * (total_cost - pref_cost[i])
                cand = seg + dp[j + 1]
                if cand < best:
                    best = cand
            dp[i] = best
        return dp[0]
