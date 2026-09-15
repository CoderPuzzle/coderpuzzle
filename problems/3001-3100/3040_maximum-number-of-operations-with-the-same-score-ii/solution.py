from typing import List, Optional


class Solution:
    def maxOperations(self, nums: List[int]) -> int:
        n = len(nums)

        def max_for_score(score):
            # dp[l][r] = max deletions inside nums[l..r] achieving `score`
            dp = [[0] * n for _ in range(n)]
            for length in range(2, n + 1):
                for l in range(0, n - length + 1):
                    r = l + length - 1
                    best = 0
                    if nums[l] + nums[l + 1] == score:
                        best = max(best, 1 + (dp[l + 2][r] if l + 2 <= r else 0))
                    if nums[r] + nums[r - 1] == score:
                        best = max(best, 1 + (dp[l][r - 2] if l + 2 <= r else 0))
                    if nums[l] + nums[r] == score:
                        best = max(best, 1 + (dp[l + 1][r - 1] if l + 2 <= r else 0))
                    dp[l][r] = best
            return dp[0][n - 1]

        candidates = {nums[0] + nums[1], nums[-1] + nums[-2], nums[0] + nums[-1]}
        return max(max_for_score(score) for score in candidates)
