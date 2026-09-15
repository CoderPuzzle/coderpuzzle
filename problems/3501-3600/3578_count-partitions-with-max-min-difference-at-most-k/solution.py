from collections import deque
from typing import List


class Solution:
    def countPartitions(self, nums: List[int], k: int) -> int:
        # dp[i + 1] = ways to partition the first i + 1 elements. The last
        # segment is nums[j..i] for some start j; valid starts form a
        # contiguous range ending at i, grown by lowering lo until the
        # window spread is <= k. Monotonic deques expose the window
        # min/max, pre holds prefix sums of dp so a range sum is one
        # subtraction.
        MOD = 10**9 + 7
        n = len(nums)
        dp = [0] * (n + 1)
        pre = [0] * (n + 2)
        dp[0] = 1
        pre[1] = 1
        lo = 0
        mins = deque()  # indices, values increasing toward the back
        maxs = deque()  # indices, values decreasing toward the back
        for i, value in enumerate(nums):
            while mins and nums[mins[-1]] >= value:
                mins.pop()
            mins.append(i)
            while maxs and nums[maxs[-1]] <= value:
                maxs.pop()
            maxs.append(i)
            while nums[maxs[0]] - nums[mins[0]] > k:
                if mins[0] == lo:
                    mins.popleft()
                if maxs[0] == lo:
                    maxs.popleft()
                lo += 1
            dp[i + 1] = (pre[i + 1] - pre[lo]) % MOD
            pre[i + 2] = (pre[i + 1] + dp[i + 1]) % MOD
        return dp[n]
