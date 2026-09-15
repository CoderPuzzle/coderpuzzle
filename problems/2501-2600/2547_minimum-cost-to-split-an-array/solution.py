from typing import List


class Solution:
    def minCost(self, nums: List[int], k: int) -> int:
        # dp[r] = min cost to split the first r elements. For each r,
        # sweep l downward from r-1 while extending one frequency table:
        # a value seen for the first time adds nothing, its second
        # occurrence adds 2 to the trimmed length (the missed first
        # occurrence plus this one), later ones add 1 each.
        n = len(nums)
        INF = float("inf")
        dp = [0] + [INF] * n
        for r in range(1, n + 1):
            freq = {}
            trimmed = 0
            best = INF
            for l in range(r - 1, -1, -1):
                count = freq.get(nums[l], 0) + 1
                freq[nums[l]] = count
                if count == 2:
                    trimmed += 2
                elif count > 2:
                    trimmed += 1
                cost = dp[l] + k + trimmed
                if cost < best:
                    best = cost
            dp[r] = best
        return dp[n]
