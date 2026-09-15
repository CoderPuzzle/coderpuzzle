from typing import List


class Solution:
    def maxScore(self, nums: List[int]) -> int:
        # dp[i] is the maximum score of a hopping path that starts at index i
        # and ends at the last element: the next hop goes to some j > i and
        # pays (j - i) * nums[j] plus whatever the best continuation from j
        # earns. Fill right to left; every hop distance telescopes into the
        # n - 1 units between index 0 and the end, so the answer stays below
        # (n - 1) * max(nums) <= 999 * 10^5 < 2^31 and plain ints suffice.
        n = len(nums)
        dp = [0] * n
        for i in range(n - 2, -1, -1):
            best = 0
            for j in range(i + 1, n):
                score = (j - i) * nums[j] + dp[j]
                if score > best:
                    best = score
            dp[i] = best
        return dp[0]
