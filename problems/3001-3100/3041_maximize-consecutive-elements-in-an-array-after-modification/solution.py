from typing import List


class Solution:
    def maxSelectedElements(self, nums: List[int]) -> int:
        nums.sort()
        dp = {}
        best = 0
        for a in nums:
            up = max(dp.get(a + 1, 0), dp.get(a, 0) + 1)
            stay = max(dp.get(a, 0), dp.get(a - 1, 0) + 1)
            dp[a + 1] = up
            dp[a] = stay
            best = max(best, up, stay)
        return best
